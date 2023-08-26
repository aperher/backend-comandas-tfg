const { findWaitersByEstabishment } = require('../models/users');

const getWaitersByEstablishment = async (req, res) => {
    try {
        const establishment = req.query.establishmentId;
        const users = await findWaitersByEstabishment(establishment);
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getWaitersByEstablishment };