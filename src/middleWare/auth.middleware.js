const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const UserModel = require("../models/user.model")
const protect = asyncHandler(async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log({ userID: decoded.id })
            req.user = await UserModel.findById(decoded.id).select("-passwrod")
            next()
        } catch (err) {
            console.log(err);
            throw new Error("UNAUTHRIZED" + `${err.message}`)
        }

    } else {
        res.status(400)
        throw new Error("unauthrize no token")
    }





})

module.exports = protect