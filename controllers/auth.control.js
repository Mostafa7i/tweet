const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")


const userController = {
    newUser : async(req,res) =>{
        try {

            logger.info(req.body)

            let data = req.body
            let dublicatedEmail = await User.findOne({email : data.email})
            if(dublicatedEmail){
                return res.status(403).send({message : "Email is already token!!"})
            }

            let newUser = new User(data)
            await newUser.save()
            res.status(201).send({
                message : "Account Created!"
            })
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message : error.message
            })
        }
    },
    login : async(req,res) =>{
        try {

            logger.info(req.body)
            const {email , password} = req.body
            const user = await User.findOne({email : email})
            if(!user) return res.status(403).send({message : "invalid email or password"})
                
            const validPassword = await bcrypt.compare(password , user.password)
            if(!validPassword) return res.status(403).send({message : "invalid email or password"})
            
            const token = jwt.sign({id:user._id} , process.env.SECRET_KEY , {expiresIn : "2d"})
            res.cookie("access_token" , token , {
                httpOnly : true,
                secure : process.env.NODE_ENV === 'production',
                sameSite :  process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge :1000* 60*60*24*2
            })

            user.tokens.push(token)
            await user.save()



            res.status(200).send({message : "Login successfilly!"})
          
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message : error.message
            })
        }
    }
}

module.exports = userController