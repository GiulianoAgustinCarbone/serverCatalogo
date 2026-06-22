import express from 'express';
import UsuarioDAOImp from "../Datos/UsuarioDAOImp.js";
import db from '../Datos/database.js';

const router = express.Router();
const usuarioDAO = new UsuarioDAOImp(db);

router.post('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) { //Solo debe poder registrar si tiene el token
        return res.status(403).json({ exito: false, message: "Acceso denegado. Solo administradores pueden registrar usuarios." });
    }

    const { nombre, email, password } = req.body;

    try {
        const usuarioExistente = await usuarioDAO.buscarPorMail(email);
        
        if (usuarioExistente) {
            return res.status(400).json({ exito: false, message: "El correo ya está registrado en el sistema." });
        }

        const nuevoAdmin = {
            nombre: nombre,
            contraseña: password,
            email: email,
            rol: "admin"
        };

        await usuarioDAO.create(nuevoAdmin);

        return res.json({ 
            exito: true, 
            message: "Usuario creado exitosamente" 
        });

    } catch (error) {
        console.error("Error en registro:", error);
        return res.status(500).json({ exito: false, message: "Error interno del servidor" });
    }
});

export default router;