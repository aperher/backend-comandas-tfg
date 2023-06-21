const { isValidUUIDv4 } = require('../util/validators');
const { findAll, findDetailsById } = require('../models/menu');

const getAll = async (req, res) => {
    const establishmentId = req.query.establishment;

    if (!isValidUUIDv4(establishmentId)) {
        return res.status(400).send({ message: 'Establishment not found' });
    }

    try {
        const menus = await findAll(establishmentId);
        res.send(menus);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getDetailsById = async (req, res) => {
    try {
        const menu = await findDetailsById(req.params.id);
        res.send(menu);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAll, getDetailsById };
    