const sql = require('../util/db');

const findUser = async (email, password) => {
    try {
        const user = await sql`
            SELECT id, nombre as name, correo as email, contraseña as password, rol as role
            FROM "Usuario"
            WHERE correo = ${email} AND contraseña = ${password}
        `;
        return user;
    } catch (error) {
        throw new Error('Can not get user');
    }
}

const findWaitersByEstabishment = async (establishmentId) => {
    try {
        const waiters = await sql`
            SELECT id, nombre as name
            FROM "Usuario" u
            INNER JOIN "UsuarioEstablecimiento" us ON us.usuario_id = u.id
            WHERE us.rol = 'Camarero' AND us.establecimiento_id = ${establishmentId}
        `;
        return waiters;
    } catch (error) {
        throw new Error('Can not get waiters');
    }
}

module.exports = { findUser, findWaitersByEstabishment };