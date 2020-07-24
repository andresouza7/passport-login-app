module.exports = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated())
        return res.status(403).send('Access denied, please login');
    next();
}