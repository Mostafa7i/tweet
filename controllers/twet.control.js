const Twet = require("../models/twet.model")
const path = require("path")
const fs = require("fs")
const twetController = {
    createTwet : async(req,res) =>{
        try {
            const date = new Date().toISOString()
            const newTwet = new Twet({...req.body , owner : req.user._id , date})

            if(req.file){
                newTwet.image = `api/twet/${req.file.filename}`
            }

            await newTwet.save()
            res.send("done")
        } catch (error) {
             res.status(500).send({
                message : error.message
            })
        }
    },
    getTwet : async(req,res) =>{
        try {
            const getTwet = await Twet.find({owner : req.user._id})
            res.send(getTwet)
        } catch (error) {
             res.status(500).send({
                message : error.message
            })
        }
    },
    updateTwet : async(req,res) =>{
        try {
            const {id} = req.params
            const updateTwet = await Twet.findOne({_id:id ,owner : req.user._id})
            if(!updateTwet) return res.status(404).send("Not Found!")
            
            if(req.file){
                if(updateTwet.image){
                    // const oldImage = path.join("uploads" , path.basename(updateTwet.image))
                    const oldImage = `uploads/${updateTwet.image.split("/").pop()}`
             
                    if(fs.existsSync(oldImage)) fs.unlinkSync(oldImage)
                }
            
                updateTwet.image = `api/twet/${req.file.filename}` 
    
            }
             Object.assign(updateTwet , req.body)
            await updateTwet.save()
            res.send(updateTwet)
        } catch (error) {
             res.status(500).send({
                message : error.message
            })
        }
    },
    deleteTwet : async(req,res) =>{
        try {
            const {id} = req.params
            await Twet.findByIdAndDelete(id)
            res.send({message : "twet deleted successfilly!"})
        } catch (error) {
             res.status(500).send({
                message : error.message
            })
        }
    },
    getAllTwets : async(req,res) =>{
        try {
            const allTwets = await Twet.find({}).populate("owner")
            res.send(allTwets)
        } catch (error) {
             res.status(500).send({
                message : error.message
            })
        }
    },
}


module.exports = twetController