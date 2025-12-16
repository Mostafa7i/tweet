const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const Schema =  mongoose.Schema

const userSchema = new Schema({
    firstName : {
        type : String,
        trim : true,
        required : true,
    },
    lastName : {
        type : String,
        trim : true,
        required : true,
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : true,
        minlength : 6
    },

    isAdmin:{
        type : Boolean,
        default : false
    },
    tokens:[
        {
            type : String,
            trim : true,
        }
    ]
})

userSchema.pre('save' , async function(){
    if(!this.isModified("password")) return;
    this.password = await bcryptjs.hash(this.password , 10)
})

const User = mongoose.model("User" , userSchema)
module.exports = User