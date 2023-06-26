const { findAllByEstablishment, findDetailsById } = require('../models/section');

const getAllByEstablishment = async (req, res) => {
    try {
        const establishment = req.query.establishment;
        const sections = await findAllByEstablishment(establishment);
        res.send(sections);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getDetailsById = async (req, res) => {
    try {
        const sectionId = req.params.id;
        const section = await findDetailsById(sectionId);
        res.send(section);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAllByEstablishment, getDetailsById };