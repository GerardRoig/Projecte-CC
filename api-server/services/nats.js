const { connect } = require('nats');

let nc;

(async () => {
    nc = await connect({ servers: 'nats://localhost:4222' });
})();

module.exports = {
    executeFunction: async (code, input) => {
        return new Promise((resolve, reject) => {
            nc.request('functions.execute', JSON.stringify({ code, input }), { timeout: 5000 }, (err, msg) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(msg.data));
                }
            });
        });
    }
};
