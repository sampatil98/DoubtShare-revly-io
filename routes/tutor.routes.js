const {Router}=require("express");

const {Avaiblity}= require("../model/tutor.avaiblity.model");

const tutorRouter=Router();


//  polling function from frontend hit this route every 3 second to update tutors last ping time

tutorRouter.get("/update-ping",async(req,res)=>{
    try {

        const {user}=req.body;

        let updatedData = await Avaiblity.findOneAndUpdate({tutorId:user._doc._id},{lastPingTime:new Date()},{new:true});

        res.status(200).send({
            isError:false,
            message:"Ping time Updated",
            updatedData
        });
        
    } catch (error) {
        res.status(500).send({
            isError:true,
            message:error.message
        })
    }
})


module.exports={tutorRouter}