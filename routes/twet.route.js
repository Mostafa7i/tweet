const express = require("express")
const router = express.Router()
const twetController = require("../controllers/twet.control")
const upload = require("../middleware/user.middleware")
const {auhtintecation, adminAuthrizated} = require("../middleware/auth.middleware")


router.route("/")
    .post( auhtintecation , upload.single("image"),twetController.createTwet)
    .get( auhtintecation ,twetController.getTwet)
    router.patch("/:id" , auhtintecation, upload.single("image") ,twetController.updateTwet)

    router.delete( "/:id" , auhtintecation ,twetController.deleteTwet)
    router.get( "/allTwets" , auhtintecation , adminAuthrizated ,twetController.getAllTwets)

module.exports = router