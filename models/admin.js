const mongoose=require("mongoose")
const loginSchema=mongoose.Schema(
    {
        username:String,
        password:String
    }
)

let loginModel=mongoose.model("logindata",loginSchema)
module.exports=loginModel