const checkOrigin = (req, res, next) => {
    const headerAuth = req.headers.authorization;
    const token = headerAuth && headerAuth.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Token not found' });
    } else {
        next();
    }
}

module.exports = checkOrigin;