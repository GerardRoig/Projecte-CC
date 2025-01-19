// server.js
require('dotenv').config();  // Cargar variables de entorno desde .env

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Importar rutas
const authRoutes = require('./routes/auth');
const functionRoutes = require('./routes/functions');

console.log('Rutas de API cargadas');


// Registrar rutas
app.use('/auth', authRoutes);
app.use('/functions', functionRoutes);

// Configuración de puerto desde variables de entorno (o por defecto 3000)
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Server corriendo en http://localhost:${PORT}`);
});
