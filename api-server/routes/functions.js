const express = require('express');
const db = require('../services/db');
const nats = require('../services/nats');

const router = express.Router();

// Registrar una función
router.post('/', (req, res) => {
    const { user, code } = req.body;
    const func = db.registerFunction(user, { code });
    res.json(func);
});

// Ejecutar una función
router.post('/:id/execute', async (req, res) => {
    const { id } = req.params;
    const func = db.getFunction(parseInt(id, 10));

    if (!func) {
        return res.status(404).json({ error: 'Función no encontrada' });
    }

    // Publicar la ejecución en NATS
    try {
        const result = await nats.executeFunction(func.code, req.body.input);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una función
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const result = db.deleteFunction(parseInt(id, 10));
    res.json(result);
});

module.exports = router;
