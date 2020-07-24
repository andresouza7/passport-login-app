const express = require('express');
const passport = require('passport');

const inputValidator = require('../middleware/inputValidator');

const router = express.Router();

router.get('/register', (req, res) => {
	res.render('register');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	inputValidator,
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
	})
);

module.exports = router;
