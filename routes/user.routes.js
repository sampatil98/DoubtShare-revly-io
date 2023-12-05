const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const {User}= require("../model/user.model");

const userRouter=Router();

userRouter.post("/register", async (req,res)=>{
    try {

        const {email,password}=req.body;

        const user= await User.findOne({email});

        // check if user present or not
        if(user){
          return  res.status(400).send({
            isError:true,
            message:"User already exist please login"});
        }

        // hash password and store in db.
        bcrypt.hash(password,10,async(err,hash)=>{
            if(hash){
                let newuser= new User({...req.body,password:hash})
                await newuser.save();
                res.status(200).send({
                    isError:false,
                    message:"User Registered Successfully"});
            }else{
               return res.status(500).send({
                    isError:true,
                    message:"internal server error.."
                });
            }
        })
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        })
    }
});




userRouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;

        // find user by email
        const user= await User.findOne({email});

        if(!user){
            return res.status(404).send({
                isError:true,
                message: "User not found please register first"
            })
        }

        // compare passward
        bcrypt.compare(password,user.password,(err,result)=>{

            if(result){

                const token= jwt.sign({...user},process.env.secret_token_key);

                res.status(200).send({
                    isError:false,
                    message:"User logged in successfully",
                    token
                })

            }else{
                res.status(400).send({
                    isError:true,
                    message:"Wrong password",
                })
            }
        })
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        })
    }
});

module.exports={userRouter}

