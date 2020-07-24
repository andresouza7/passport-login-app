module.exports = (req, res, next) => {
	const { username, password } = req.body;
	if (
		username === undefined ||
		username === '' ||
		password === undefined ||
		password === ''
	)
		return res.send('Error, missing data');
	next();
}
