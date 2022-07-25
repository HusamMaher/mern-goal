const asyncHandler = require('express-async-handler')
const GoalModel = require("../models/goal.model")
const UserModel = require("../models/user.model")
const setGoals = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("pleas add a text in body")
    }
    const newGoal = await GoalModel.create({
        text: req.body.text,
        user: req.body.userId,
        userId: req.body.userId
    })

    const createdGoal = await GoalModel.findById(newGoal._id).populate("user")
    return res.status(200).json(createdGoal)

})

const getUserGoal = asyncHandler(async (req, res) => {
    const goals = await GoalModel.find({
        userId: req.user._id
    })
    res.json(goals)
})
const getOneGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findOne({
        _id: req.params.id
    })
    if (!goal) {
        res.status(200)
        throw new Error("goal not found")
    }
    return res.status(200).json(goal)
})
const getGoals = async (req, res) => {

    let goals = await GoalModel.find().populate(["user"])

    res.status(200).json(goals)
}
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findById(req.params.id).populate("user")
    //check if goal exist
    if (!goal) {
        res.status(400)
        throw new Error("goal not found")
    }
    const user = await UserModel.findById(req.user.id)

    if (goal.user._id.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authrized")
    }
    const updatedGoal = await GoalModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(200).json({ meesage: updatedGoal })

})
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("goal not found")
    }
    const user = await UserModel.findById(req.user.id)

    if (goal.user._id.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authrized")
    }
    await goal.remove()
    return res.sendStatus(200).json({ id: req.params.id })
})
module.exports = {
    setGoals,
    updateGoals,
    getGoals,
    deleteGoal,
    getOneGoal,
    getUserGoal
}