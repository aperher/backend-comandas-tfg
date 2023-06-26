const express = require('express');
const router = express.Router();
const fs = require('fs');

const PATH_ROUTER = __dirname;

const cleanFilename = (fileName) => {
    const clean = fileName.substr(0, fileName.indexOf('.'));
    return clean;
};

fs.readdirSync(PATH_ROUTER).forEach((fileName) => {
    if (fileName === 'index.js') return;
    const prefixRoute = cleanFilename(fileName);
    const route = require(`./${prefixRoute}.js`);
    router.use(`/${prefixRoute}`, route);
});

module.exports = router;