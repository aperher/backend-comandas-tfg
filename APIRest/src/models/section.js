const sql = require('../util/db');

const findAllByEstablishment = async (establishmentId) => {
    try {
        const sections = await sql`
            SELECT id, nombre
            FROM "Seccion"
            WHERE establecimiento_id = ${establishmentId}
        `;
        return sections;
    } catch (error) {
        throw new Error('Can not get sections');
    }
}

const findDetailsById = async (sectionId) => {
    try {
        const section = await sql`
        SELECT s.id, s.nombre, 
            json_agg(
                json_build_object('id', m.id, 'numero', m.numero, 'estado', ca.estado) ORDER BY m.numero
            ) AS mesas
        FROM "Seccion" s
        LEFT JOIN "Mesa" m ON m.seccion_id = s.id
        LEFT JOIN "Comanda" c ON c.mesa_id = m.id AND c.esta_en_servicio = true
        LEFT JOIN "ComandaArticulo" ca ON ca.comanda_id = c.id
        WHERE s.id = ${sectionId}
        GROUP BY s.id
        `;
        return section;
    } catch (error) {
        throw new Error('Can not get the section details');
    }
}

module.exports = { findAllByEstablishment, findDetailsById };