var express = require("express");
var router = express.Router();

router.get("/login", function(req, res){
    res.render("login", {stylesheetPage: "loginAndRegister.css"});
});

router.get("/register", function(req, res){
    res.render("register", {stylesheetPage: "loginAndRegister.css"});
});


module.exports = router;