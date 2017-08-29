var express = require("express"),
    app = express();
    
//requring routes
var usersRoutes = require("./routes/users"),
    indexRoutes = require("./routes/index");

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/users", usersRoutes);

app.get("*", function(req, res) {
    res.redirect("/");
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