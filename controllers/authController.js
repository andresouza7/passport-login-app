const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Configure session
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    User.findOne({username: username}, {password: 0}, function(err, user) {
        done(err, user);
    });
});
// configure authentication
passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username }, async function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
                console.log('no user found');
				return done(null, false, { message: 'Incorret username' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
                console.log('wrong password');
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	})
);
