const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../services/db');  // Ya lo tienes importado

const router = express.Router();
const SECRET_KEY = 'mi_secreto_super_seguro';

// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => {
    res.json(db.users);  // Accedemos a `users` desde db.js
});

// Registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.registerUser(username, password);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        await db.authenticateUser(username, password);
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
