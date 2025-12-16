const express = require("express")
const router = express.Router()
const userController = require("../controllers/auth.control")
const {newUserValidation , loginUserValidation} = require("../middleware/userVaildation.middleware")


router.post("/login" , loginUserValidation ,userController.login )
router.post("/singup" , newUserValidation ,userController.newUser )

module.exports = router