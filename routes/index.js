var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Image = require("../models/image");
var passport = require("passport");



router.get("/register", function(req, res){
    res.render("register", {
        stylesheetPage: "loginAndRegister.css",
         scripts: ["register"]
    });
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
    var imageName = imageFile.name;
    if (imageFile.mimetype.search("image") != -1) {    
        User.register(newUser, req.body.password, function(err, userCreated){
            if (err) {
                req.flash("error", err.message);
                res.redirect("/register");
            }else{
                Image.create({nameTemp: imageName}, function(err, imageCreated){
                    if (err) {
                        console.log(err);
                    }else{
                        var endingImg = imageName.substring(imageName.indexOf("."));
                        imageCreated.user.id = userCreated._id;
                        imageCreated.user.username = userCreated.username;
                        imageCreated.imageSrc = '/images/users/' + imageCreated._id + endingImg;
                        imageCreated.save();
                        userCreated.profilePicture.id = imageCreated._id;
                        userCreated.profilePicture.imageSrc = '/images/users/' + imageCreated._id + endingImg;
                        userCreated.save();
                        imageFile.mv('./public/images/users/' + imageCreated._id + endingImg);

                        passport.authenticate("local")(req, res, function(){
                            var msg = 'You have successfully registered and logged in as ' + userCreated.username;
                            req.flash("success", msg);
                            res.redirect("/users");
                        });
                    }
                });
            }
        });
    }else {
        req.flash("error", "You didn't uploaded image or your image weighs more than 1mb");
        res.redirect("/register");
    }
});

router.get("/login", function(req, res){
    res.render("login", {stylesheetPage: "loginAndRegister.css"});
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/users",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/users");
});

module.exports = router;