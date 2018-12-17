const mongoose = require('mongoose');
const User = mongoose.model('User');

// /api/profile/ (GET): shows profile of a logged user
module.exports.getProfile = function(res, req){
    // if no user exists in JWT, return error
    if (!req.payload._id){
        res.status(401).json({'message': 'Error: private information'});
    } else {
        User.findById(req.payload._id).exec(function(err, user){
            if (err) res.status(404).json(err); // if no user exists in BD, error
            else res.status(200).json(user);
        });
    }
}