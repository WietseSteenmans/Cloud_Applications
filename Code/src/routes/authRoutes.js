// var express = require('express');
// var authRouter = express.Router();


// 	authRouter.route('/signup').post(function(req,res){
// 		console.log(req.body);
// 		req.login(req.body, function(){
// 			res.redirect('/auth/profile');
// 		});
// 	});

// 	authRouter.route('/profile').get(function(req, res){
// 		res.json(req.user);
// 	});

// module.exports = authRouter;

var express = require('express');
var authRouter = express.Router();
//var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

module.exports = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            req.login(req.body, function(){
            	res.redirect('/auth/profile');
            });
        });
    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });
    return authRouter;   
    // authRouter.route('/signIn')
    //     .post(passport.authenticate('local', {
    //         failureRedirect: '/'
    //     }), function (req, res) {
    //         res.redirect('/auth/profile');
    //     });


};
