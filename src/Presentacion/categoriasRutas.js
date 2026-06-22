import express from 'express';
import db from '../Datos/database.js';
import CategoriaDAOImp from '../Datos/CategoriaDAOImp.js';

const router = express.Router();

const categoriaDAO = new CategoriaDAOImp(db);

router.get('/', async (req, res) => {
    try {
        const categorias = await categoriaDAO.getAll();
        if (categorias && categorias.length > 0) {
            return res.json(categorias);
        } else {
            return res.status(404).json({
                exito: false,
                mensaje: "No se encontraron categorias"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            exito: false,
            mensaje: "Error al obtener categorias"
        });
    }
});


router.get('/porRubro/:idRubro', async (req, res) => {
    try{
        const {idRubro} = req.params;
        const categorias = await categoriaDAO.getByRubro(idRubro);
        return categorias
    } catch(error){
        console.error(error);
        return res.status(500).json({
            exito: false,
            mensaje: "Error al obtener categorias de ese rubro"
        });
    }
})

export default router;