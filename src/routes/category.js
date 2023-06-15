const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const { 
    getAll, 
    getAllFiltered,
    getById, 
    create, 
    update, 
    remove 
} = require('../controllers/category');

router.get('/', getAll);
/*router.get('/filter', getAllFiltered);
router.get('/:id', getById);
router.post('/', checkOrigin,  create);
router.put('/:id', update);
router.delete('/:id', remove);*/

module.exports = router;