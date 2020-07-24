const express = require('express');
const userController = require('../controllers/userController');
const inputValidator = require('../middleware/inputValidator');
const verifyLogin = require('../middleware/verifyLogin');

const router = express.Router();

router.post('/', inputValidator, userController.register);

router.get('/', userController.find);

router.get('/protected', verifyLogin, (req, res) => {
    res.send(`you're now allowed in the protected area...`);
})

module.exports = router;