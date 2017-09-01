var mongoose    = require("mongoose");
    
var commentSchema = mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
		username: String,
		firstname: String,
		lastname: String,
		profilePicture: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);