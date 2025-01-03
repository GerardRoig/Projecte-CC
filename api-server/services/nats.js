const { connect, StringCodec } = require('nats');

// Conectar a NATS
const natsUrl = process.env.NATS_URL || 'nats://nats:4222'; // Usar variable de entorno o un valor por defecto
let nc;

(async () => {
    try {
        nc = await connect({ servers: natsUrl });
        console.log(`Conectado a NATS en ${natsUrl}`);
    } catch (err) {
        console.error('Error de conexión a NATS:', err);
    }
})();

// String Codec para codificar y decodificar mensajes
const sc = StringCodec();

// Función exportada para enviar solicitudes a NATS
module.exports = {
    executeFunction: async (code, input) => {
        if (!nc) {
            throw new Error('No se ha podido conectar a NATS');
        }

        try {
            // Realizar la solicitud
            const response = await nc.request(
                'functions.execute',
                sc.encode(JSON.stringify({ code, input })),
                { timeout: 5000 }
            );

            // Decodificar y parsear la respuesta
            return JSON.parse(sc.decode(response.data));
        } catch (err) {
            throw new Error(`Error en la solicitud a NATS: ${err.message}`);
        }
    }
};
