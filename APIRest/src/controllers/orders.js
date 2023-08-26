const { 
    getAll, 
    getByOrderId, 
    createOrder, 
    updateOrder, 
    updateArticlesInOrderServedState, 
    updateOrdersNotInService 
} = require('../models/orders');

const getAllFiltered = async (req, res) => {
    const establishmentId = req.query.establishmentId;
    const userIdFilter = req.query.userId;
    const dateFilter = req.query.date;
    try {
        const orders = await getAll(establishmentId, userIdFilter, dateFilter);
        res.send(orders);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await getByOrderId(orderId);
        res.send(order);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const create = async (req, res) => {
    const body = req.body;
    try {
        const isCreated = await createOrder(body);
        res.send(isCreated);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
};

const update = async (req, res) => {
    console.log(req.body);
    const body = req.body;
    try {
        await updateOrder(body);
        res.send();
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
};

const setServedState = async (req, res) => {
    try {
        const articleInOrderId = req.params.id;
        const isServed = await updateArticlesInOrderServedState(articleInOrderId);
        res.send(isServed);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const finishService = async (req, res) => {
    try {
        const orderId = req.params.id;
        const isFinished = await updateOrdersNotInService(orderId);
        res.send(isFinished);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const remove = (req, res) => {
    res.send('remove');
};

module.exports = { 
    getAllFiltered, 
    getById, 
    create, 
    update, 
    setServedState, 
    finishService, 
    remove 
};
    