const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { getAllByEstablishment } = require('../controllers/categories');

router.get('/', getAllByEstablishment);

module.exports = router;