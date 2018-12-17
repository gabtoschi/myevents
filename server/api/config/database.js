const mongoose = require('mongoose');
var secureShutdown;

const dbHost = 'mongodb://database/myevents';

mongoose.connect(dbHost);

// checking connections
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dbHost);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose error: ' + err);
});

// shutdown
secureShutdown = function(cause, callback){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by " + cause);
        callback();
    })
}

process.on('SIGINT', function(){
    secureShutdown('app closed', function(){
        process.exit(0);
    })
})

// models
require('../models/users');
require('../models/events');

/*const express = require('express');
const router = express.Router();

const userSchema = new mongoose.Schema({
    name: String,
    age: String
});

const User = mongoose.model('User', userSchema);

router.get('/users', (req, res) => {
    User.find(function (err, result){
        if (err) res.send(err);
        res.json(result);        
    });
});

router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully.'
        });
    });
});

router.get('/', (req, res) => {
    res.send('api works');
});

module.exports = router;*/