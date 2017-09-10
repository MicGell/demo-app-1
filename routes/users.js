var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Image = require("../models/image");
var middleware = require("../middleware");
var fs = require('fs');

var unlock_route = function(req, res, next){
  req.session.processing = false; // unset flag
  next();
};

router.get("/", function(req, res){
    User.find({},function(err, allUsers){
        if (err) {
            console.log(err);
        }else{
            res.render("users/allShow", {
                users: allUsers, 
                stylesheetPage: "usersViewPage.css", 
                scripts: ["singleUserAndUserViewShow", "showAllUserPage"]
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

router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    res.render("users/edit", {
        stylesheetPage: "loginAndRegister.css",
        scripts: ["register"]
    });
});

router.put("/:id/edit", middleware.isLoggedIn, function(req, res){  
    User.findById(req.params.id, function(err, foundUser){
        if (err) {
            console.log(err);
        }else{
            Image.findById(req.user.profilePicture.id, function(err, foundImage){
                if (err) {
                    console.log(err);
                }else{
                    if ( !(typeof req.files.image === 'undefined')) { 
                        var imageFile = req.files.image;
                        var imageName = imageFile.name;
                        if (imageFile.mimetype.search("image") != -1) {
                            var filePath = './public' + foundUser.profilePicture.imageSrc; 
                                fs.unlinkSync(filePath, function (err) {
                                console.log(err);
                            });
                            var endingImg = imageName.substring(imageName.indexOf("."));
                            foundImage.imageSrc = '/images/users/' + foundImage._id + endingImg;
                            foundImage.save();
                            foundUser.profilePicture.id = foundImage._id;
                            foundUser.profilePicture.imageSrc = '/images/users/' + foundImage._id + endingImg;
                            imageFile.mv('./public/images/users/' + foundImage._id + endingImg);
                        }
                    }  
                    foundUser.username = req.body.username,
                    foundUser.password = req.body.password,
                    foundUser.firstname = req.body.firstname,
                    foundUser.lastname = req.body.lastname,
                    foundUser.city = req.body.city,
                    foundUser.country = req.body.country,
                    foundUser.save();      
                    var msg = 'You have successfully edited ' + foundUser.username +' profile';
                    req.flash("success", msg);
                    res.redirect("/users/" + foundUser._id);              
                }
            });  
        }
    })
});   

router.post("/:id/like", middleware.checkUserUserProfile, function(req, res){
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            function isThisIdUserFoundHere(element) {
                return element.equals(userFound._id);                
            }
            if (typeof req.user.likesUsers.find(isThisIdUserFoundHere) === "undefined") {
                req.user.likesUsers.push(userFound);
                req.user.save();
                userFound.likes = userFound.likes + 1;
                userFound.save();
                req.flash("success", "Successfully liked " + userFound.firstname + " " + userFound.lastname);
                res.redirect("/users/" + userFound._id);
            }
        }
    });
});

router.post("/:id/unlike", middleware.checkUserUserProfile, function(req, res){
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            function isThisIdUserFoundHere(element) {
                return element.equals(userFound._id);                
            }
            if (typeof req.user.likesUsers.find(isThisIdUserFoundHere) !== "undefined") {
                var indexToRemove = req.user.likesUsers.indexOf(userFound);
                req.user.likesUsers.splice(indexToRemove, 1);
                req.user.save();
                userFound.likes = userFound.likes - 1;
                userFound.save();
                req.flash("success", "Successfully unliked " + userFound.firstname + " " + userFound.lastname);
                res.redirect("/users/" + userFound._id);
            }
        }
    });
});

router.post("/:id/follow", middleware.checkUserUserProfile, function(req, res){
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            function isThisIdUserFoundHere(element) {
                return element.equals(userFound._id);                
            }
            if (typeof req.user.followingsUsers.find(isThisIdUserFoundHere) === "undefined") {
                req.user.following = req.user.following + 1;
                req.user.followingsUsers.push(userFound);
                req.user.save();
                userFound.followers.push(req.user);
                userFound.save();
                req.flash("success", "Successfully followed " + userFound.firstname + " " + userFound.lastname);
                res.redirect("/users/" + userFound._id);
            }
        }
    });
});

router.post("/:id/unfollow", middleware.checkUserUserProfile, function(req, res){
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            function isThisIdUserFoundHere(element) {
                return element.equals(userFound._id);                
            }
            if (typeof req.user.followingsUsers.find(isThisIdUserFoundHere) !== "undefined") {
                req.user.following = req.user.following - 1;
                var indexToRemove = req.user.followingsUsers.indexOf(userFound);
                req.user.followingsUsers.splice(indexToRemove, 1);
                req.user.save();
                var indexToRemove2 = userFound.followers.indexOf(req.user);
                userFound.followers.splice(indexToRemove2, 1);
                userFound.save();
                req.flash("success", "Successfully unfollowed " + userFound.firstname + " " + userFound.lastname);
                res.redirect("/users/" + userFound._id);
            }
        }
    });
});

module.exports = router;
