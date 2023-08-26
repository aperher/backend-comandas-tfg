const { 
    findAllByCategory, 
    findProminentArticles, 
    findPopularArticles, 
    findDetailsById, 
    findArticleOrderById,
    findReadyArticleListByEstablishmentId
} = require('../models/articles');

const getAllByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const articles = await findAllByCategory(category);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getPopularArticles = async (req, res) => {
    try {
        const establishmentId = req.query.establishmentId;
        const articles = await findPopularArticles(establishmentId);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getProminentArticles = async (req, res) => {
    try {
        const establishmentId = req.query.establishmentId;
        const articles = await findProminentArticles(establishmentId);
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

const getArticleOrderById = async (req, res) => {
    try {
        const articleOrderId = req.params.id;
        const articles = await findArticleOrderById(articleOrderId);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getReadyArticleOrderListByEstablishmentId = async (req, res) => {
    try {
        const establishmentId = req.params.id;
        const articles = await findReadyArticleListByEstablishmentId(establishmentId);
        res.send(articles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { 
    getAllByCategory, 
    getProminentArticles, 
    getPopularArticles, 
    getDetailsById, 
    getArticleOrderById,
    getReadyArticleOrderListByEstablishmentId
};
    