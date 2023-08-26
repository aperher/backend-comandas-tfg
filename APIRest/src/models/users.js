const sql = require('../util/db');

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

module.exports = { findWaitersByEstabishment };