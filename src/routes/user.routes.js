const router = require("express").Router()
const protect = require("../middleWare/auth.middleware")
const userConteroller = require("../controller/user.controller")
const goalController = require("../controller/goals.controller")
router.get("/profile", protect, userConteroller.profile)
router.get("/goals", protect, goalController.getUserGoal)

module.exports = router