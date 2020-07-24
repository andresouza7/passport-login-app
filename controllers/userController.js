const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.register = async (req, res, next) => {
    var { username, password } = req.body;
    console.log(req.body);
    // check if there existing user with same username
    const existingUser = await User.findOne({username});
    console.log(existingUser);
    if (existingUser) return res.send('Username already taken');

    // hash password
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword
        });
        try {
            await newUser.save();
            res.send('new user created');
        } catch (error) {
            res.send(error);
        }
    } catch (error) {
        res.send(error);
    }
}

exports.find = async (req, res) => {
    try {
        const users = await User.find({});
        res.render(users);
    } catch (error) {
        res.send(error);
    }
}