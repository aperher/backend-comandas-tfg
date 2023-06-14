const getAll = (req, res) => {
    res.send('getAll');
};

const getAllFiltered = (req, res) => {
    res.send('');
};

const getById = (req, res) => {
    res.send('getById');
};

const create = (req, res) => {
    res.send('create');
};

const update = (req, res) => {
    res.send('update');
};

const remove = (req, res) => {
    res.send('remove');
};

module.exports = { getAll, getById, create, update, remove };
    