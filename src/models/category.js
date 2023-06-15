const sql = require('../util/db');

const findAll = async (establishmentId) => {
    try {
        const categories = await sql`
            SELECT id, nombre as name, descripcion as description, "imagenURL" as "imageURL" 
            FROM "Categoria" 
            WHERE establecimiento_id = ${establishmentId}
        `;
        return categories;
    } catch (error) {
        throw new Error('Can not get categories');
    }
}

module.exports = { findAll };