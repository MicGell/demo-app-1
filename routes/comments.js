var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS CREATE 
router.post("/new", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, userFound){
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.firstname = req.user.firstname,
                    comment.author.lastname = req.user.lastname,
                    comment.author.profilePicture = req.user.profilePicture.imageSrc
                    comment.save();
                    userFound.comments.push(comment);
                    userFound.save();
                    req.flash("success", "Successfully added comment.");
                    res.redirect("/users/" + userFound._id);
                }
            });
        }
    });
});

// COMMENT DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            req.flash("error", "Error deleted.");
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted!");
            res.redirect("/users/" + req.params.id);
        }
    });
});


module.exports = router;