const mongoose=require("mongoose");

const tutorAvaiblity= new mongoose.Schema({
    tutorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    lastPingTime: { 
        type: Date, 
        default: Date.now
    }

});

const Avaiblity= mongoose.model("tutorAvaiblitiy",tutorAvaiblity);

module.exports={Avaiblity};