const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { checkParamId } = require('../middlewares/validation');
const { 
    getAllFiltered,
    getById, 
    create, 
    update, 
    setServedState,
    finishService,
    remove 
} = require('../controllers/orders');

//router.get('/', getAll);
router.get('/', getAllFiltered);
router.get('/:orderId', getById);
router.post('/', /* checkOrigin,*/ create);
router.put('/', /* checkOrigin,*/ update);
router.put('/servearticle/:id', checkParamId, setServedState);
router.put('/finishservice/:id', checkParamId, finishService);
router.delete('/:id', remove);

module.exports = router;