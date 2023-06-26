const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { checkParamId } = require('../middlewares/validation');
const { getAllByCategory, getDetailsById } = require('../controllers/article');

router.get('/', getAllByCategory);
router.get('/:id', checkParamId, getDetailsById);

module.exports = router;