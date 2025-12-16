
const User = require("../models/user.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")
const bcryptjs = require("bcryptjs")

const userController = {
    deleteUser: async(req,res) =>{
    try {
            logger.info(req.params)
            const {id} = req.params
            await User.findByIdAndDelete(id)
            res.send({message : "account deleted!!"})
    } catch (error) {
             logger.error(error.message)
            res.status(500).send({
                message : error.message
            })
    }
},

updateUser : async(req,res) =>{
    try {
        const allowedUpdates = ["firstName" , "lastName" , "email"]
        let = updates = {};

        allowedUpdates.forEach(filed =>{
            if(req.body[filed]) updates[filed] = req.body[filed]
        })

        if(req.file){
            updates.image = `api/user/${req.file.filename}`
        }
        const user = await User.findByIdAndUpdate(req.user._id ,updates, {new : true}).select("-password -tokens -isAdmin")

            res.send(user)
    } catch (error) {
         res.status(500).send({
                message : error.message
            })
    }
}  , 
updatePassword : async(req,res) =>{
    try {
            const {oldPassword , newPassword , rePassword} = req.body
            if(newPassword !== rePassword) return res.status(400).send({message : "password is not match"})

            const user = await User.findById(req.user._id)
            if(!user)  return res.status(404).send({message : "User  not found"})
                
                const valid = await bcryptjs.compare(oldPassword , user.password)
                if(!valid)  return res.status(403).send({message : "iNVALID Password"})
                
            user.password = newPassword
            await user.save()

            res.send({message : "Password Updated Successfilly!"})
    } catch (error) {
         res.status(500).send({
                message : error.message
            })
    }
},

getUser : async(req,res) => {
    try {
        const user = await User.findById(req.user._id)
        if(!user) return res.status(404).send({message : "USER NOT FOUND"}).select("-password -tokens -isAdmin")

        res.send(user)
    } catch (error) {
          res.status(500).send({
                message : error.message
            })
    }
},
getAllUser : async(req,res) => {
    try {
        const users = await User.find({}).select("-password -tokens -isAdmin")
        if(!users) return res.status(404).send({message : "USERS NOT FOUND"})

        res.send(users)
    } catch (error) {
          res.status(500).send({
                message : error.message
            })
    }
},


logOut : async(req,res) =>{
    try {
        let user = await User.findById(req.user._id)
        user.tokens = user.tokens.filter(ele => ele !== req.token)
        await user.save()
          res.cookie("access_token" , '' , {
                httpOnly : true,
                maxAge : 0
            })
            res.status(200).send({message : "Logout successfilly!"})

    } catch (error) {
         res.status(500).send({
                message : error.message
            })
    }
}

}

module.exports = userController