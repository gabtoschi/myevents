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

// event controller
const eventController = require('../controllers/event');
router.post('/event', eventController.createEvent);
router.get('/event/all/:userId', eventController.getEvents);
router.get('/event/:eventId', eventController.getEventById);
router.delete('/remove/:eventId', eventController.removeEvent);

// profile controller
const profileController = require('../controllers/profile');
router.get('/profile', auth, profileController.getProfile);

module.exports = router;