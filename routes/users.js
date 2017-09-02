var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/", function(req, res){
    User.find({},function(err, allUsers){
        if (err) {
            console.log(err);
        }else{
            res.render("users/allShow", {
                users: allUsers, 
                stylesheetPage: "usersViewPage.css", 
                scripts: ["singleUserAndUserViewShow"]
            });
        }    
    });
});

router.get("/:id", function(req, res){
    User.findById(req.params.id).populate("comments").exec(function(err, foundUser){
        if (err) {
            console.log(err);
        }else{
            function isThisIdHere(element) {
                return element.equals(foundUser._id);                
            }
                                
            if (typeof req.user !== "undefined") {
                var liked = req.user.likesUsers.find(isThisIdHere);
                var followed = req.user.followingsUsers.find(isThisIdHere);
            }      
            var date = Date.now();
        	res.render("users/singleShow", {
                stylesheetPage: "userPageComments.css",
                user: foundUser,
                liked: liked,
                followed: followed,
                dateNow: date,
                scripts: ["singleUserAndUserViewShow", "singleUserPage"]
            });
        }
    });
    
});

router.post("/:id/like", middleware.checkUserUserProfile, function(req, res){
    console.log('test');
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            req.user.likesUsers.push(userFound);
            req.user.save();
            userFound.likes = userFound.likes + 1;
            userFound.save();
            req.flash("success", "Successfully liked " + userFound.firstname + " " + userFound.lastname);
            res.redirect("/users/" + userFound._id);
        }
    });
});

router.post("/:id/follow", middleware.checkUserUserProfile, function(req, res){
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            req.user.following = req.user.following + 1;
            req.user.followingsUsers.push(userFound);
            req.user.save();
            userFound.followers.push(req.user);
            userFound.save();
            req.flash("success", "Successfully followed " + userFound.firstname + " " + userFound.lastname);
            res.redirect("/users/" + userFound._id);
        }
    });
});

router.post("/:id/unlike", middleware.checkUserUserProfile, function(req, res){
    console.log('test');
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            var indexToRemove = req.user.likesUsers.indexOf(userFound);
            req.user.likesUsers.splice(indexToRemove, 1);
            req.user.save();
            userFound.likes = userFound.likes - 1;
            userFound.save();
            req.flash("success", "Successfully unliked " + userFound.firstname + " " + userFound.lastname);
            res.redirect("/users/" + userFound._id);
        }
    });
});

router.post("/:id/unfollow", middleware.checkUserUserProfile, function(req, res){
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            req.user.following = req.user.following - 1;
            var indexToRemove = req.user.followingsUsers.indexOf(userFound);
            req.user.likesUsers.splice(indexToRemove, 1);
            req.user.save();
            var indexToRemove2 = userFound.followers.indexOf(req.user);
            userFound.followers.splice(indexToRemove2, 1);
            userFound.save();
            req.flash("success", "Successfully unfollowed " + userFound.firstname + " " + userFound.lastname);
            res.redirect("/users/" + userFound._id);
        }
    });
});

module.exports = router;
