import express from 'express';
import db from '../Datos/database.js';
import ProductoDAOImp from '../Datos/ProductoDAOImp.js';
import Producto from '../Negocio/Producto.js';
import Categoria from '../Negocio/Categoria.js';
import multer from 'multer';
import fs from 'fs';
import cloudinary from '../configCloudinary/cloudinary.js';

const router = express.Router();

const productoDAO = new ProductoDAOImp(db);

// multer almacena temporalmente la imagen en la carpeta uploads
const upload = multer({dest: 'uploads/'});

router.get('/', async (req, res) => {
    try{
        const { categoria, rubro, titulo, pagina } = req.query;
        const productos = await productoDAO.getAll({ categoria, rubro, titulo, pagina });

        return res.json(productos);
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: "Error al obtener productos"
        });
    }
});

// get para obtener todos los productos sin filtros
router.get('/obtenerTodos', async (req, res) => {
    try {
        const productos = await productoDAO.obtenerTodos();
        return res.json(productos);
    } catch (error) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al obtener productos"
        });
    }
});

// solicitud para cargar un producto nuevo. imagen es el nombre que envio el front para la imagen del producto
router.post('/cargarProducto', upload.single('imagen') , async (req, res) => {
    let idPublico = null;

    try{
        // Verificacion que multer haya atrapado la imagen
        if (!req.file) {
            return res.status(400).json({ exito: false, mensaje: "No se envió ninguna imagen." });
        }
        
        // verificacion de los campos
        const { titulo, descripcion, precio, cantidad, idcategoria} = req.body; //cantidad minimo sera 1
        
        if (!titulo || !descripcion || !precio || cantidad <= 0 || !idcategoria) {
            fs.unlinkSync(req.file.path);  // para limpiar la imagen temporal en uploads
            return res.status(400).json({ exito: false, mensaje: "Faltan campos por completar!" });
        }

        // para subir el archivo local a Cloudinary
        const rspCloudinary = await cloudinary.uploader.upload(req.file.path, {
            folder: 'catalogo_piezas' // este es el nombre de la carpeta en cloudinary
        });

        // eliminamos la foto temporal
        fs.unlinkSync(req.file.path);

        // obtenemos el id publico y la URL segura que genero Cloudinary para la imagen
        idPublico = rspCloudinary.public_id;
        const imagenUrl = rspCloudinary.secure_url;

        // cargar el producto a la bd
        const idCatObj = new Categoria(idcategoria, null, null);
        const prodNuevo = new Producto(null, titulo.trim(), descripcion.trim(), parseFloat(precio), cantidad, null, imagenUrl, idCatObj);
        const idProdNuevo = await productoDAO.create(prodNuevo); 
        
        return res.status(201).json({
            exito: true,
            mensaje: "Producto agregado exitosamente",
            idProducto: idProdNuevo
        });
    }
    catch (error) {
        console.error("Error:", error);

        // el idpublico nos servira para eliminar la imagen cuando el producto falle antes de guardarse en la bd
        if (idPublico) {
            try {
                await cloudinary.uploader.destroy(idPublico);
                console.log("Imagen eliminada de Cloudinary");
            } catch (destroyError) {
                console.error("No se pudo eliminar la imagen de Cloudinary:", destroyError);
            }
        }
        
        // eliminar el archivo temporal en caso de un error inesperado
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({
            exito:false,
            mensaje: "Error al cargar el producto"
        });
    }
});

// Esto para eliminar los productos de forma rapida con Postman

router.delete('/borrarProducto/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await productoDAO.delete(id);
        if (resultado === 0) {
            return res.status(404).json({ exito: false, mensaje: "Producto no encontrado" });
        }
        return res.json({ exito: true, mensaje: "Producto eliminado de la bd correctamente"});
    } catch (error) {
        console.error("Error al eliminar:", error);
        return res.status(500).json({ exito: false, mensaje: "Error al eliminar el producto"});
    }
});

export default router;