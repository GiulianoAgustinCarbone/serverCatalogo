import express from 'express';
import UsuarioDAOImp from "../Datos/UsuarioDAOImp.js";
import db from '../Datos/database.js';

const router = express.Router();

const usuarioDAO = new UsuarioDAOImp(db);

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await usuarioDAO.buscarPorMail(email);

        if (!usuario) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        if (usuario.contraseña !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        return res.json({
            message: "Login exitoso",
            token: "fake-token-123"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del servidor" });
    }
});



export default router;