var express         = require("express"),
    bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose"),
    flash        = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride   = require("method-override"),
    Comment         = require("./models/comment"),
    User         = require("./models/user"),
    fileUpload      = require('express-fileupload');

app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 }
}));   
    
//requring routes
var usersRoutes = require("./routes/users"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://tester:zxc@ds111124.mlab.com:11124/demo-recruitment-app-1");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Secret to secret my secret!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middle line function to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

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