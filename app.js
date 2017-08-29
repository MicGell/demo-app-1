var express = require("express"),
    app = express();
    
    
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("users");
});

app.get("/user/:id", function(req, res){
    res.render("user");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.listen(100, process.env.IP, function(){
    console.log("Server has started.")
    console.log(process.env.PORT)
});