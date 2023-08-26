const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { checkParamId } = require('../middlewares/validation');
const { getWaitersByEstablishment, loginUser } = require('../controllers/users');

router.post('/login', loginUser);
router.get('/waiters', getWaitersByEstablishment);

module.exports = router;