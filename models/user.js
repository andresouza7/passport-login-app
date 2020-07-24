const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    profile: Object
});

module.exports = mongoose.model('User', userSchema);