var express = require('express');
var router = express.Router();

// java web token
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'I_AM_BATMAN',
    userProperty: 'payload'
});

// auth controller
const authController = require('../controllers/auth');
router.post('/register', authController.register);
router.post('/login', authController.login);

// profile controller
const profileController = require('../controllers/profile');
router.get('/profile', auth, profileController.getProfile);

module.exports = router;