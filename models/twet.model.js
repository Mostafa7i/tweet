const mongoose = require("mongoose")
const Schema =  mongoose.Schema

const userSchema = new Schema({
    title : {
        type : String,
        trim : true,
        required : true,
    },
    content : {
        type : String,
        trim : true,
        required : true,
    },

    image : {
        type : String,
        trim : true
    },
    date : {
        type : String,
        trim : true
    },

    owner :{
        type : mongoose.Types.ObjectId,
        ref : "User",
        required  : true
    }

})


const Twet = mongoose.model("Twet" , userSchema)
module.exports = Twet