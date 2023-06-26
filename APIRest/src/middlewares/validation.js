const { isValidUUIDv4 } = require('../util/validators');

const checkParamId = (req, res, next) => {
    const id = req.params.id;
    if (!isValidUUIDv4(id)) {
        return res.status(400).send({ message: 'Id is not correct' });
    } else {
        next();
    }
}

module.exports = { checkParamId };