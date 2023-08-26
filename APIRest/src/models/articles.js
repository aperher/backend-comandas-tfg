const sql = require('../util/db');

const findAllByCategory = async (categoryId) => {
    try {
        const articles = await sql`
            SELECT id, nombre as name, descripcion as description, precio as price, "imagenURL" as image
            FROM "Articulo" 
            WHERE categoria_id = ${categoryId}
        `;
        return articles;
    } catch (error) {
        throw new Error('Can not get articles');
    }
}

const findPopularArticles = async (establishmentId) => {
    try {
        const articles = await sql`
            SELECT a.id, a.nombre as name, descripcion as description, precio as price, a."imagenURL" as image, COUNT(ca.articulo_id) as cantidad
            FROM "ComandaArticulo" ca
            INNER JOIN "Articulo" a ON ca.articulo_id = a.id AND a."esBebida" = false AND a.establecimiento_id = ${establishmentId}
            GROUP BY a.id, a.nombre
            ORDER BY cantidad DESC
            LIMIT 10;
        `;
        return articles;
    } catch (error) {
        throw new Error('Can not get popular articles');
    }
}

const findProminentArticles = async (establishmentId) => {
    try {
        const articles = await sql`
        SELECT a.id, a.nombre as name, descripcion as description, precio as price, a."imagenURL" as image
        FROM "Articulo" a
        WHERE a.establecimiento_id = ${establishmentId} and a.destacado_prioridad is not null
        ORDER BY a.destacado_prioridad
        LIMIT 10;
        `;
        return articles;
    } catch (error) {
        throw new Error('Can not get prominent articles');
    }
}

const findDetailsById = async (articleId) => {
    try {
        const articles = await sql`
            SELECT 
                a.id, a.nombre as name, a.descripcion as description, precio as price, "imagenURL" as image,  
                CASE WHEN COUNT(i.id) = 0 
                    THEN '[]'
                    ELSE json_agg(json_build_object('id', i.id, 'name', i.nombre))
                END AS ingredients
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

const findArticleOrderById = async (articleOrderId) => {
    try {
        const [article] = await sql`
            select
                ca.id,
                ca.comanda_id as orderId,
                a.nombre as name,
                s.nombre as section,
                m.numero as table,
                ca.estado as status,
                case
                when count(ca.id) = 1 then '[]'
                else json_agg(json_build_object('id', i.id, 'name', i.nombre))
                end as extras
            from
                "ComandaArticulo" ca
                inner join "Comanda" c on ca.comanda_id = c.id
                inner join "Articulo" a on ca.articulo_id = a.id
                inner join "Mesa" m on c.mesa_id = m.id
                inner join "Seccion" s on m.seccion_id = s.id
                left join "ComandaArticuloIngrediente" cai on cai.comanda_articulo_id = ca.id
                left join "Ingrediente" i on cai.ingrediente_id = i.id
            where
                ca.id = ${articleOrderId}
            group by
                ca.id,
                a.nombre,
                s.nombre,
                m.numero;
        `;
        return article;
    } catch (error) {
        throw new Error('Can not get the article details');
    }
}

const findReadyArticleListByEstablishmentId = async (establishmentId) => {
    try {
        const articles = await sql`
            select
                ca.id,
                a.nombre as name,
                s.nombre as section,
                m.numero as table,
                case
                when count(ca.id) = 1 then '[]'
                else json_agg(json_build_object('id', i.id, 'name', i.nombre))
                end as extras
            from
                "ComandaArticulo" ca
                inner join "Comanda" c on ca.comanda_id = c.id
                inner join "Articulo" a on ca.articulo_id = a.id
                inner join "Mesa" m on m.id = c.mesa_id
                inner join "Seccion" s on m.seccion_id = s.id
                left join "ComandaArticuloIngrediente" cai on cai.comanda_articulo_id = ca.id
                left join "Ingrediente" i on cai.ingrediente_id = i.id
            where
                s.establecimiento_id = ${establishmentId} and ca.estado = 'preparado'
            group by
                ca.id,
                a.nombre,
                s.nombre,
                m.numero;
        `;
        return articles;
    } catch (error) {
        throw new Error('Can not get the article list');
    }
}

module.exports = { 
    findAllByCategory, 
    findProminentArticles, 
    findPopularArticles, 
    findDetailsById, 
    findArticleOrderById,
    findReadyArticleListByEstablishmentId
};