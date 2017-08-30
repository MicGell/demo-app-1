var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.render("users/allShow", {stylesheetPage: "userPageComments.css"});
});
router.get("/:id", function(req, res){
    res.render("users/singleShow", {stylesheetPage: "userPageComments.css"});
});


module.exports = router;