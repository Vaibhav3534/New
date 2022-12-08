import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const userSchema = new mongoose.Schema({
    first_name: {type:String,required: true, minLength:1},
    last_name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true },
    verified:{type:Boolean, required:true, default:false },
})

userSchema.path("password").validate(function(s){
    return s.length > 6
})

const userModel = mongoose.model("Users" ,userSchema)

export default userModel