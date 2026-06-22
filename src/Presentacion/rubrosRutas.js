import express from 'express';
import db from '../Datos/database.js';
import RubroDAOImp from '../Datos/RubroDAOImp.js';

const router = express.Router();

const rubroDAO = new RubroDAOImp(db);

router.get('/', async (req, res) => {
    try {
        const rubros = await rubroDAO.getAll();
        if (rubros && rubros.length > 0) {
            return res.status(200).json(rubros);
        } else {
            return res.status(404).json({
                exito: false,
                mensaje: "No se encontraron rubros"
            });
        }
    } catch (error) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al obtener rubros"
        });
    }
});

export default router;