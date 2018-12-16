const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const dbHost = 'mongodb://database/myevents';
mongoose.connect(dbHost);
console.log(mongoose.connection.readyState);

router.get('/', (req, res) => {
    res.send('api works');
});

module.exports = router;