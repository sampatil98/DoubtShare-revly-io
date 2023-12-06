const mongoose=require("mongoose");

const doughtSchema= new mongoose.Schema({
    studentId:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default: new Date
    },
    title:{
        type:String,
        require:true
    },
    userlanguage: {
        type: String,
        require:true
    },
    subject: { 
        type: String,
        require:true
    }, 
    class: { 
        type: String,
        require:true
    }

});

const Dought= mongoose.model("dought",doughtSchema);

module.exports={Dought};