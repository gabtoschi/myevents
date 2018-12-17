const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// /api/register (POST): create a new user in DB
module.exports.register = function(req, res){
    // create the user instance
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);

    // save in DB
    newUser.save(function (err){
        // error check
        if (err) {
            res.status(500).json(err);
            return;
        }

        // create JSON Web Token
        var token = newUser.generateJwt();

        // return
        res.status(200).json({'token': token});
    });
};

// /api/login (POST): authenticate a user in DB
module.exports.login = function(req, res){
    // passport auth
    passport.authenticate('local', function(err, user, info){
        // error check
        if (err) {
            res.status(404).json(err);
            return;
        }

        // user found, auth done
        if (user){
            const token = user.generateJwt();
            res.status(200).json({'token': token});
        } else res.status(401).json(info);
    })(req, res);
};


