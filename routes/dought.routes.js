const {Router}=require("express");

const {Dought} = require("../model/doughts.model");

const doughtRouter=Router();


// this endpoint returns list of all the doubts asked by the student sorted by time (latest doubt first).

doughtRouter.get("/history", async(req,res)=>{
    try {

        // taking users._id as studentId wich is present in jwt payload 
        // i attached decoded payload data from jwt token with req.body in authentication middleware. 
        let data= await Dought.find({studentId:req.user._id}).sort({ createdAt: -1 });

        res.status(200).send({
            isError:false,
            data
        })
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        })
    }
});

doughtRouter.post("/add", async(req,res)=>{
    try {
        

        let dought= new Dought({...req.body,studentId:req.user._id});
        await dought.save();

        res.status(200).send({
            isError:false,
            message:"dought created successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        })
    }
});

module.exports={doughtRouter}