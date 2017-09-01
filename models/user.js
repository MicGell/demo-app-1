var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    city: String,
    country: String,
    likes: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    profilePicture: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        },
        imageSrc: String
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);