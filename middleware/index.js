// all the middleware goes here
var User = require("../models/user");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

middlewareObj.checkUserUserProfile = function(req, res, next){
    if (req.isAuthenticated()) {
        User.findById(req.params.id, function(err, foundUser){
            if (err) {
                req.flash("error", "User not found.");
                res.redirect("/users");
            }else{
                if (foundUser._id.equals(req.user._id)) {
                    next();
                }else{
                    req.flash("error", "You don't have premission to do that.");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                req.flash("error", "User not found.");
                res.redirect("/users");
            }else{
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }else{
                    req.flash("error", "You don't have premission to do that.");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

module.exports = middlewareObj;