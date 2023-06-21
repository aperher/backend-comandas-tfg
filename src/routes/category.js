const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { getAll } = require('../controllers/category');

router.get('/', getAll);

module.exports = router;