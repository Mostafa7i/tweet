const {newUserSchema , loginUserSchema} = require("../services/userValidation.service");
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("user")


function newUserValidation(req , res , next){
    const {error} = newUserSchema.validate(req.body , {abortEarly : false})
    if(error){
        logger.info(error)
        return res.status(400).send({
            message : "Validation Faild!",
            details : error.details.map(d => d.message)
        })
    }

    next()
}

function loginUserValidation(req , res , next){
    const {error} = loginUserSchema.validate(req.body , {abortEarly : false})
    if(error){
        logger.info(error)
        return res.status(400).send({
            message : "Validation Faild!",
            details : error.details.map(d => d.message)
        })
    }

    next()
}

module.exports = {newUserValidation , loginUserValidation}