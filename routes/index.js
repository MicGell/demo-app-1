var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Image = require("../models/image");
var passport = require("passport");

router.get("/login", function(req, res){
    res.render("login", {stylesheetPage: "loginAndRegister.css"});
});

router.get("/register", function(req, res){
    res.render("register", {stylesheetPage: "loginAndRegister.css"});
});

router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
        country: req.body.country,
    });
    var imageFile = req.files.image;
    User.register(newUser, req.body.password, function(err, userCreated){
        if (err) {
            req.flash("error", err.message);
            console.log(err);
            res.redirect("/register");
        }else{
            Image.create({name: imageFile.name}, function(err, imageCreated){
                if (err) {
                    console.log(err);
                }else{
                    imageCreated.user.id = userCreated._id;
                    imageCreated.user.username = userCreated.username;
                    imageCreated.save();
                    userCreated.profilePicture.id = imageCreated._id;
                    userCreated.save();
                    imageFile.mv('./public/images/users/' + imageCreated._id + '.jpg');
                }
            });
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "You have successfully registered and logged  in as " + userCreated.username);
                res.redirect("/");
            });
        }
    });
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;