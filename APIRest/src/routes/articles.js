const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { checkParamId } = require('../middlewares/validation');
const { 
    getAllByCategory, 
    getPopularArticles, 
    getProminentArticles, 
    getDetailsById, 
    getArticleOrderById, 
    getReadyArticleOrderListByEstablishmentId 
} = require('../controllers/articles');

router.get('/', getAllByCategory);
router.get('/popular_articles', getPopularArticles);
router.get('/prominent_articles', getProminentArticles);
router.get('/:id', checkParamId, getDetailsById);
router.get('/ready/:id', checkParamId, getArticleOrderById);
router.get('/ready/establishment/:id', checkParamId, getReadyArticleOrderListByEstablishmentId);

module.exports = router;