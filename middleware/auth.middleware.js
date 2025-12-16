
const User = require("../models/user.model");
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")
const jwt = require("jsonwebtoken")





const auhtintecation = async(req,res,next) =>{
    try {
        
        const token = req?.cookies?.access_token;
        if(!token) return res.status(401).send({message  : "Unauthintecation user!"})
            
            const decode = jwt.verify(token , process.env.SECRET_KEY)
            
            const user = await User.findById(decode.id)
            if(!user) return res.status(401).send({message  : "Unauthintecation user!"})
                
                if(!user.tokens.includes(token))
                return res.status(401).send({message  : "Unauthintecation user!"})

            const userData = user.toObject()
            delete userData.password
            delete userData.tokens

            req.user = userData
            next()

    } catch (error) {
         logger.error(error.message)
            res.status(401).send({
                message : error.message
            })
    }
}

const adminAuthrizated = (req,res,next) =>{
    if(!req.user.isAdmin){
        return res.status(401).send({message  : "Unauthintecation Admin!"})
    }

    next()
}

module.exports = {auhtintecation , adminAuthrizated}