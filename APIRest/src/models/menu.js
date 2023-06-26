const sql = require('../util/db');

const findAllByEstablishment = async (establishmentId) => {
    try {
        const menus = await sql`
            SELECT id, nombre, precio, comensales
            FROM "Menu" 
            WHERE establecimiento_id = ${establishmentId}
        `;
        return menus;
    } catch (error) {
        throw new Error('Can not get menus');
    }
}

const findDetailsById = async (menuId) => {
    try {
        const menus = await sql`
            SELECT
                m.id, m.nombre, m.descripcion, m.precio, m.comensales,
                json_agg(json_build_object('id', a.id, 'nombre', a.nombre)) 
                    FILTER (WHERE ma.tipo = 'entrantes') AS entrantes,
                json_agg(json_build_object('id', a.id, 'nombre', a.nombre)) 
                    FILTER (WHERE ma.tipo = 'primeros') AS primeros,
                json_agg(json_build_object('id', a.id, 'nombre', a.nombre)) 
                    FILTER (WHERE ma.tipo = 'segundos') AS segundos,
                json_agg(json_build_object('id', a.id, 'nombre', a.nombre)) 
                    FILTER (WHERE ma.tipo = 'postres') AS postres
            FROM "Menu" m
            LEFT JOIN "MenuArticulo" ma ON m.id = ma.menu_id
            LEFT JOIN "Articulo" a ON ma.articulo_id = a.id
            WHERE m.id = ${menuId}
            GROUP BY m.id;
        `;
        return menus;
    } catch (error) {
        throw new Error('Can not get the menu details');
    }
}

module.exports = { findAllByEstablishment, findDetailsById };