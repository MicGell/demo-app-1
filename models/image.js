var mongoose    = require("mongoose");
    
var imageSchema = mongoose.Schema({
    name: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Image", imageSchema);