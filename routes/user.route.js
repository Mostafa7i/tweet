const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.control")
const {auhtintecation, adminAuthrizated} = require("../middleware/auth.middleware")


router.route("/:id")
    .delete(  auhtintecation, adminAuthrizated,  userController.deleteUser)
router.route("/")
    .patch(auhtintecation , userController.updateUser)
    .get(auhtintecation , userController.getUser)
router.post("/update/password" , auhtintecation , userController.updatePassword)
router.get("/allUsers" , auhtintecation , adminAuthrizated , userController.getAllUser)
router.post("/logout" , auhtintecation  , userController.logOut)


module.exports = router