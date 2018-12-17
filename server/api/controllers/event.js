const mongoose = require('mongoose');
const Event = mongoose.model('Event');

// /api/event (POST): create a new event
module.exports.createEvent = function(req, res){
    // create the event structure
    var newEvent = new Event();
    newEvent.creator = req.body.userId;
    newEvent.description = req.body.description;
    newEvent.startDate = req.body.startDate;
    newEvent.endDate = req.body.endDate;

    // save in DB
    newEvent.save(function (err){
        // error check
        if (err) {
            res.status(500).json(err);
            return;
        }

        // return
        res.status(200);
    })
};