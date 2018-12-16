const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const dbHost = 'mongodb://database/myevents';
mongoose.connect(dbHost);
console.log(mongoose.connection.readyState);

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

module.exports = router;