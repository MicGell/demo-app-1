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



var port = 99;
if (process.env.PORT) {
	port = process.env.PORT;
} else {
	port = 99;
}

app.listen(port, process.env.IP, function(){
    console.log("Server has started.");
});