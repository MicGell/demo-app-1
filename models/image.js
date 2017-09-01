var mongoose    = require("mongoose");
    
var imageSchema = mongoose.Schema({
    nameTemp: String,
    imageSrc: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Image", imageSchema);