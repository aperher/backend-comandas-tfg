const { isValidUUIDv4 } = require('../util/validators');
const { findAll, findDetailsById } = require('../models/article');

const getAll = async (req, res) => {
    const categoryId = req.query.category;

    if (!isValidUUIDv4(categoryId)) {
        return res.status(400).send({ message: 'Category not found' });
    }

    try {
        const articles = await findAll(categoryId);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getDetailsById = async (req, res) => {
    try {
        const articles = await findDetailsById(req.params.id);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAll, getDetailsById };
    