const sql = require('../util/db');

const getAll = async (establishmentId, userIdFilter, dateFilter) => {
    try {
        const orders = await sql`
            SELECT c.id as id, m.numero as table, s.nombre as section, c.fecha_hora_inicio as init_time, c.fecha_hora_fin as end_time
            FROM "Comanda" c
            INNER JOIN "Mesa" m ON c.mesa_id = m.id
            INNER JOIN "Seccion" s ON m.seccion_id = s.id
            WHERE c.esta_en_servicio = false and s.establecimiento_id = ${establishmentId} 
                ${userIdFilter ? sql`and c.usuario_id = ${ userIdFilter }` : sql``} 
                ${dateFilter ? sql`and c.fecha_hora_inicio::date = ${ dateFilter }` : sql``}
        `;
        console.log(orders);
        return orders;
        
    } catch (error) {
        throw new Error(error.message);
    }
};


const getByOrderId = async (orderId) => {
    try {
        const [order] = await sql`
            SELECT c.id as id, m.numero as table, s.nombre as section, c.fecha_hora_inicio as init_time, c.fecha_hora_fin as end_time, 
            json_agg(
                json_build_object(
                    'id', ca.id, 
                    'articleId', ca.articulo_id,
                    'name', a.nombre,
                    'price', a.precio,
                    'state', ca.estado,
                    'extras', (
                        SELECT json_agg(json_build_object('id',i.id, 'name',i.nombre, 'price',i.precio_suplemento)) 
                        FROM "ComandaArticuloIngrediente" cai, "Ingrediente" i 
                        WHERE cai.comanda_articulo_id = ca.id and cai.ingrediente_id = i.id
                    )
                )
            ) as articles
            FROM "Comanda" c
            INNER JOIN "ComandaArticulo" ca ON ca.comanda_id = c.id
            INNER JOIN "Articulo" a ON a.id = ca.articulo_id
            INNER JOIN "Mesa" m ON m.id = c.mesa_id
            INNER JOIN "Seccion" s ON s.id = m.seccion_id
            WHERE c.id = ${orderId}
            GROUP BY c.id, m.numero, s.nombre;
        `;
        return order;
    } catch (error) {
        throw new Error('Can not get order');
    }
}

const createOrder = async (body) => {
    try {
        return await sql.begin(async sql => {
            const orderId = await createOrderRow(sql, body);
            console.log(orderId);
            if (body.articles.length > 0) {
                await createArticleOrderRows(sql, orderId, body);
            }
            console.log('articles created');

            return true;
          }
        )
    } catch (error) {
        console.log(error);
        throw new Error('Can not create the order');
    }
}

const updateOrder = async (body) => {
    try {
        await updateArticleOrderRows(body);
    } catch (error) {
        throw new Error('Can not update the order');
    }
}

const updateArticlesInOrderServedState = async (articleOrderId) => {
    try {
        return (await sql`UPDATE "ComandaArticulo" 
        SET estado = 'servido' WHERE id = ${articleOrderId} and (estado = 'preparado' or estado = 'pedido')
        RETURNING id;`).count > 0;
    } catch (error) {
        throw new Error('Can not update the article in order served state');
    }
}

const updateOrdersNotInService = async (orderId) => {
    try {
        return (await sql`UPDATE "Comanda"
        SET esta_en_servicio = false and fecha_hora_fin = now()
        WHERE id = ${orderId} and esta_en_servicio = true and NOT EXISTS(select 1 from "ComandaArticulo" ca where ca.comanda_id = ${orderId} and ca.estado <> 'servido')
        RETURNING id;`).count > 0;
    } catch (error) {
        throw new Error('Can not update the order not in service');
    }
}

async function createOrderRow(sql, {id, userId, tableId, initTime}) {
    console.log('createOrderRow');
    const [order] = await sql`
            INSERT INTO "Comanda" (id, usuario_id, fecha_hora_fin, esta_en_servicio, concepto, mesa_id, fecha_hora_inicio)
            VALUES (${id ?? sql`DEFAULT`}, '7dd34dbf-6d95-4562-be2f-76ee12a3fbba', NULL, true, NULL, ${tableId}, ${initTime ?? sql`DEFAULT`})
            RETURNING id;`
            console.log(order);
    return order.id
}

async function createArticleOrderRows(sql, orderId, {articles}) {
    const articlePromises = articles.map(async (article) => {
        const [orderArticle] = await sql`
            INSERT INTO "ComandaArticulo" (id, comanda_id, articulo_id, estado) 
            VALUES (${article.id ?? sql`DEFAULT`}, ${orderId}, ${article.articleId}, ${article.state})
            RETURNING id;`

        await createIngredientsInArticleOrderRows(sql, article.extras, orderArticle.id);
    })
    await Promise.all(articlePromises);
}

async function createIngredientsInArticleOrderRows(sql, ingredients, orderArticleId) {
    const ingredientPromises = ingredients.map(async (ingredient) => {
        return sql`
        INSERT INTO "ComandaArticuloIngrediente" (comanda_articulo_id, ingrediente_id)
        VALUES (${orderArticleId}, ${ingredient.id})`
    })
    await Promise.all(ingredientPromises);
}

async function updateArticleOrderRows({id, articles}) {
    await sql.begin(async sql => {
        if (articles.length === 0) {
            await sql`DELETE FROM "Comanda" WHERE id = ${id}`; return;
        }

        const articlesIdsToUpdate = articles.filter(article => article.id !== undefined).map(article => article.id)
        const articlesToCreate = articles.filter(article => article.id === undefined)

        await sql`DELETE FROM "ComandaArticulo" 
        WHERE id NOT IN ${sql(articlesIdsToUpdate)} and comanda_id = ${id};`

        createArticleOrderRows(sql, id, {articles: articlesToCreate})
    })
}


// Finalizar comanda, esto es, ponerle fecha_hora_fin y esta_en_servicio = false y además eliminar elemento de ComandaArticulo y ComandaArticuloIngrediente 

module.exports = { getAll, getByOrderId, createOrder, updateOrder, updateArticlesInOrderServedState, updateOrdersNotInService };