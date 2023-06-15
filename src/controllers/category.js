const { isValidUUIDv4 } = require('../util/validators');
const { findAll } = require('../models/category');

const getAll = async (req, res) => {
    const establishmentId = req.query.establishment;

    if (!isValidUUIDv4(establishmentId)) {
        return res.status(400).send({ message: 'Establishment not found' });
    }

    try {
        const categories = await findAll(establishmentId);
        res.send(categories);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAll };
    