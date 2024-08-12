const express=require( "express")
const mongoose=require("mongoose")
const cors=require( "cors")
const jwt=require("jsonwebtoken")
const bcrypt=require( "bcrypt")
const loginmodel=require("./models/admin")

const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://anna:anna@cluster0.ld2gi.mongodb.net/rescueAppDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signup",(req,res)=>{
    let input=req.body
    let hashedpassword=bcrypt.hashSync(input.password,10)
    input.password=hashedpassword
    let result=loginmodel(input)
    result.save()
    res.json({"status":"success"})
})

app.post("/signIn",(req,res)=>{
    let input=req.body
    let result=loginmodel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const result=bcrypt.compareSync(input. password,response[0]. password)
                if (result) {
                    jwt.sign({email:input.username},"rescueapp",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"token failed"})
                            } else {
                                res.json({"status":"success","token":token})
                            }

                    })
                    
                } else {
                    res.json({"status":"incorrect password"})
                    
                }
                
            } else {
                res.json({"status":"username doesnot exit"})
                
            }
        }
    ).catch(
        (error)=>{
            res.json(error)
        }
    )
})


app.listen(8080,()=>{
    console.log("server started")
})