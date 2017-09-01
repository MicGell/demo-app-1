var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    city: String,
    country: String,
    profilePicture: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);