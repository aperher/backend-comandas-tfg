const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { checkParamId } = require('../middlewares/validation');
const { getWaitersByEstablishment } = require('../controllers/users');

router.get('/waiters', getWaitersByEstablishment);

module.exports = router;