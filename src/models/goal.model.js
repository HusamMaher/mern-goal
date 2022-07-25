const mongoose = require("mongoose")


const GoalsShema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "please add text value"]
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model("Goal", GoalsShema)