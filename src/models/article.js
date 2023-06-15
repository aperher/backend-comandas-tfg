const sql = require('../util/db');

const findAll = async (categoryId) => {
    try {
        const articles = await sql`
            SELECT id, nombre, precio, "imagenURL"
            FROM "Articulo" 
            WHERE categoria_id = ${categoryId}
        `;
        return articles;
    } catch (error) {
        throw new Error('Can not get articles');
    }
}

const findDetailsById = async (articleId) => {
    try {
        const articles = await sql`
            SELECT 
                a.id, a.nombre, a.descripcion, precio, "imagenURL",  
                CASE WHEN COUNT(i.id) = 0 
                    THEN '[]'
                    ELSE json_agg(json_build_object('id', i.id, 'nombre', i.nombre))
                END AS ingredientes
            FROM "Articulo" a
            LEFT JOIN "ArticuloIngrediente" ai ON a.id = ai.articulo_id
            LEFT JOIN "Ingrediente" i ON ai.ingrediente_id = i.id
            WHERE a.id = ${articleId}
            GROUP BY a.id
        `;
        return articles;
    } catch (error) {
        throw new Error('Can not get the article details');
    }
}

module.exports = { findAll, findDetailsById };