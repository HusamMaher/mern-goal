const { Schema, model } = require("mongoose")

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    goals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Goal"

        }
    ]
}, {
    timeStampe: true,
    versionKey: false
})
module.exports = model("User", userSchema)