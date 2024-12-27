const bcrypt = require('bcrypt');

let users = [];
let functions = [];

module.exports = {
    // Usuarios
    users,
    registerUser: async (username, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        return { message: 'Usuario registrado exitosamente' };
    },
    authenticateUser: async (username, password) => {
        const user = users.find(u => u.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            return { message: 'Autenticación exitosa' };
        }
        throw new Error('Usuario o contraseña incorrectos');
    },

    // Funciones
    registerFunction: (user, func) => {
        const id = functions.length + 1;
        functions.push({ id, user, ...func });
        return { id, ...func };
    },
    listFunctions: (user) => functions.filter(f => f.user === user),
    getFunction: (id) => functions.find(f => f.id === id),
    deleteFunction: (id) => {
        functions = functions.filter(f => f.id !== id);
        return { message: 'Función eliminada' };
    }
};
