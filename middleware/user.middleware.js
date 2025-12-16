
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination : "uploads/",

    filename : (req, file , cb) =>{
        cb( null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage,
    limits : {fileSize : 5 * 1024 *1024}, //5MB

    fileFilter : (req , file , cb) =>{
        const allowed = ["image/png" , "image/jpg" , "image/jpeg"]
        cb(null , allowed.includes(file.mimetype))
    }
})


module.exports = upload

