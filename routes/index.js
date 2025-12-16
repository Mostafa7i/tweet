const express = require("express")
const router = express.Router()
const authRouter = require("./auth.route")
const userRouter = require("./user.route")
const twetRouter = require("./twet.route")


router.use("/user" , userRouter)
router.use("/auth" , authRouter)
router.use("/twet" , twetRouter)


module.exports = router