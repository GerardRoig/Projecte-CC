const { connect } = require('nats');

// Definir la variable NATS_URL con un valor por defecto en caso de que no esté definida
//const natsUrl = process.env.NATS_URL || 'nats://nats:4222';  // Cambia el valor por defecto si es necesario
const natsUrl = 'nats://localhost:4222';
let nc;

(async () => {
    try {
        // Intentar conectar a NATS con la URL especificada
        nc = await connect({ servers: natsUrl });
        console.log(`Conectado a NATS en ${natsUrl}`);
    } catch (err) {
        console.error('Error de conexión a NATS:', err);
    }
})();

// Usar la función exportada con conexión ya establecida
module.exports = {
    executeFunction: async (code, input) => {
        if (!nc) {
            return Promise.reject(new Error('No se ha podido conectar a NATS'));
        }

        return new Promise((resolve, reject) => {
            // Asegurarse de que 'nc' esté disponible antes de hacer la solicitud
            nc.request('functions.execute', JSON.stringify({ code, input }), { timeout: 5000 }, (err, msg) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        resolve(JSON.parse(msg.data));
                    } catch (parseError) {
                        reject(new Error('Error al parsear la respuesta de NATS'));
                    }
                }
            });
        });
    }
};
