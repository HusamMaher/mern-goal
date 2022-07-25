const { genSalt, hash, compare } = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const signup = asyncHandler(async (req, res, next) => {
    const { email, password, name } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please add all fields")
    }
    const existUser = await userModel.findOne({ email })
    if (existUser) {
        res.status(400)
        throw new Error("user already exist")
    }

    const salt = await genSalt(12)
    const hashedPass = await hash(password, salt)
    const user = await userModel.create({
        name,
        email,
        password: hashedPass
    })
    if (user) {
        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken: generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error("invalid user data")
    }
}
)

const signin = asyncHandler(async (req, res, next) => {
    const { password, email } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("invalid credintial")
    }
    const user = await userModel.findOne({ email })

    if (user && await compare(password, user.password)) {
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("invalid credintial")
    }

})
const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    return token
}
module.exports = {
    signup,
    signin

}
