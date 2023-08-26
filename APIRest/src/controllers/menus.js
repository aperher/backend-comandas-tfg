const { findAllByEstablishment, findDetailsById } = require('../models/menus');

const getAllByEstablishment = async (req, res) => {
    try {
        const establishmentId = req.query.establishment;
        const menus = await findAllByEstablishment(establishmentId);
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

module.exports = { getAllByEstablishment, getDetailsById };
    