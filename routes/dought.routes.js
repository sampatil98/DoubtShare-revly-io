const {Router}=require("express");

const {Dought} = require("../model/doughts.model");

const doughtRouter=Router();


// this endpoint returns list of all the doubts asked by the student sorted by time (latest doubt first).

doughtRouter.get("/history", async(req,res)=>{
    try {
        const {user}=req.body;

        let data= await Dought.find({studentId:user._doc._id}).sort({ createdAt: -1 });

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

module.exports={doughtRouter}