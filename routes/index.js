var express = require("express"),
	router = express.Router();

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/login", function(req, res){
    res.render("login");
});
router.get("/signup", function(req, res){
    res.render("signup");
});


module.exports = router;