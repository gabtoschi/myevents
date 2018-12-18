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
        res.status(200).json({'success': true});
    })
};

// /api/event/all/:userId (GET): return all events created by a user
module.exports.getEvents = function (req, res){
    // if no user exists in JWT, return error
    //if (!req.payload._id){
    //    res.status(401).json({'message': 'Error: private information'});
   // } else {
        // check for all events created by the user
        Event.find({creator: req.params.userId}).exec(function(err, events){
            if (err) res.status(404).json(err);
            else res.status(200).json(events);
        });
    //}
}

// /api/event/:eventId (GET): return a event by id
module.exports.getEventById = function (req, res){
    Event.findById(req.params.eventId).exec(function(err, event){
        if (err) res.status(404).json(err);
        else res.status(200).json(event);
    });
}

// /api/remove/:eventId (DELETE): remove a event by id
module.exports.removeEvent = function (req, res){
    Event.findByIdAndRemove(req.params.eventId).exec(function(err, event){
        if (err) res.status(404).json(err);
        else res.status(200).json(event);
    });
}

// /api/edit/:eventId (PUT): edit a event by id
module.exports.editEvent = function (req, res){
    Event.findByIdAndUpdate(req.params.eventId, req.body).exec(function(err, event) {
        if (err) res.status(404).json(err);
        else res.status(200),json(event);
    });
}