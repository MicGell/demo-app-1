var express 		= require("express"),
	bodyParser      = require("body-parser"),
    app 			= express();
    
//requring routes
var usersRoutes = require("./routes/users"),
    indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));




app.use("/", indexRoutes);
app.use("/users", usersRoutes);

app.get("/", function(req, res){
    res.redirect("/users");
});
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