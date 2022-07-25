const router = require("express").Router()
const protect = require("../middleWare/auth.middleware")
const GoalController = require("../controller/goals.controller")

router.route("/").get(protect, GoalController.getGoals).post(protect, GoalController.setGoals)
router.get("/:id", protect, GoalController.getOneGoal)
router.put("/:id", protect, GoalController.updateGoals)
router.delete("/:id", protect, GoalController.deleteGoal)






module.exports = router