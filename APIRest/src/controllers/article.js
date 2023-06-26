const { findAllByCategory, findDetailsById } = require('../models/article');

const getAllByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const articles = await findAllByCategory(category);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getDetailsById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const articles = await findDetailsById(articleId);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAllByCategory, getDetailsById };
    