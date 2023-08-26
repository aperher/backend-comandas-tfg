const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { checkParamId } = require('../middlewares/validation');
const { getAllByEstablishment, getDetailsById } = require('../controllers/sections');

router.get('/', getAllByEstablishment);
router.get('/:id', checkParamId, getDetailsById);

module.exports = router;