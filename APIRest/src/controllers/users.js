const { findUser, findWaitersByEstabishment } = require('../models/users');

const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await findUser(email, password);
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getWaitersByEstablishment = async (req, res) => {
    try {
        const establishment = req.query.establishmentId;
        const users = await findWaitersByEstabishment(establishment);
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { loginUser, getWaitersByEstablishment };