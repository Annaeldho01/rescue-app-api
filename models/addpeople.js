const mongoose=require("mongoose")
const peopleschema=mongoose.Schema(
    {
       name:String,
       phnumber:String,
       village:String,
       place:String,
       pincode:String,
       houseno:String,
       missingdate:String,
       adharno:String,
       gender:String,
       age:String
    }
)

const addmodel=mongoose.model("peoples",peopleschema)
module.exports=addmodel