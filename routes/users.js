var express = require("express"),
	router = express.Router();


router.get("/", function(req, res){
    res.render("users/allShow");
});
router.get("/:id", function(req, res){
    res.render("users/singleShow");
});


module.exports = router;