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


middlewareObj.checkCommentUserProfile = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                req.flash("error", "Campground not found.");
                res.redirect("/campgrounds");
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