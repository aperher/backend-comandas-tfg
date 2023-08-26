const { findAllByEstablishment } = require('../models/categories');

const getAllByEstablishment = async (req, res) => {
    try {
        const establishmentId = req.query.establishment;
        const categories = await findAllByEstablishment(establishmentId);
        res.send(categories);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAllByEstablishment };
    