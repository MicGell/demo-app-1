var express = require("express"),
	router = express.Router();

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});


module.exports = router;