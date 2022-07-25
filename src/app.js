const express = require("express")
const colors = require("colors")
require("dotenv").config()

//require files
const { errorHandler } = require("./middleWare/error.middleWare")
const { responseHandler } = require("./middleWare/response.midleware")
const { connectDb } = require("./config/db.confg")

//require routes
const goalsRouter = require("./routes/goals.routes")
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const PORT = process.env.PORT || 3333

connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use("/api/goals", goalsRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.all('*', async (req, res) => {
    res.status(404).send("what my friend ?  ");
});
app.use(responseHandler)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`app is listing on port ${PORT}`);
})
