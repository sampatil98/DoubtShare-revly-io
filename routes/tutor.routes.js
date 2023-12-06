const {Router}=require("express");

const {Avaiblity}= require("../model/tutor.avaiblity.model");

const tutorRouter=Router();


//  polling function from frontend hit this route every 3 second to update tutors last ping time

tutorRouter.get("/update-ping",async(req,res)=>{
    try {
        
        // taking users._id as tutorId wich is present in jwt payload 
        // i attached decoded payload data from jwt token with req.body in authentication middleware. 
        
        let updatedData = await Avaiblity.findOneAndUpdate({tutorId:req.user._doc._id},{lastPingTime:new Date()},{new:true});

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