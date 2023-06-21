const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { checkParamId } = require('../middlewares/validation');
const { getAll, getDetailsById } = require('../controllers/menu');

router.get('/', getAll);
router.get('/:id', checkParamId, getDetailsById);

module.exports = router;