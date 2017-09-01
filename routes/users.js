var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/", function(req, res){
    User.find({},function(err, allUsers){
        if (err) {
            console.log(err);
        }else{
            res.render("users/allShow", {users: allUsers, stylesheetPage: "usersViewPage.css"});
        }    
    });
});

router.get("/:id", function(req, res){
    res.render("users/singleShow", {stylesheetPage: "userPageComments.css"});
});

module.exports = router;