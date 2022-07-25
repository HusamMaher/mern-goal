//require models
const UserModel = require("../models/user.model")


//main functions
const profile = async (req, res) => {
    const id = req.user.id
    const user = await UserModel.findById(id).select("-password")
    if (!user) {
        res.status(400)
        throw new Error("user not found")
    }

    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        user
    })

}

module.exports = {
    profile
}