import express from 'express';
import {construirMensaje} from './../Negocio/mails.js';

const router = express.Router();

router.post('/', async (req, res) => {
    
    try {
        const { productoId, nombre, email, mensaje } = req.body;
        await construirMensaje(productoId, nombre, email,mensaje); //Funcion que va a crear el correo y enviarlo

        return res.json({ exito: true, mensaje: "Email enviado" });
    } catch (error) {
        return res.status(500).json({ exito: false, mensaje: "Error al recibir la consulta" });
    }
});

export default router;