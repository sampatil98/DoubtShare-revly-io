const express=require("express");
const cors=require("cors");
require("dotenv").config();
const cron=require("node-cron");

const connection=require("./config/db");
const {Avaiblity} = require('./model/tutor.avaiblity.model');
const {userRouter}=require("./routes/user.routes");
const {tutorRouter}=require("./routes/tutor.routes");
const {doughtRouter}=require("./routes/dought.routes");
const {authentication}=require("./middleware/auth");

const app=express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send(`<h1> Welcome to Real-Time Doubt Solving Platform Backend</h1>`);
});


app.use("/user",userRouter);

app.use(authentication);
app.use("/tutor",tutorRouter);
app.use("/dought",doughtRouter);



// JOB wich count and console available tutors count every second

async function countAvailableTutors() {

    const currentTime = new Date();
    const threeSecondAgo = new Date(currentTime.getTime() - 3000);

  try {

    // it count tutors if their last ping time is within a 3-second window of the current time.
    let count = await Avaiblity.find({lastPingTime: { $gte: threeSecondAgo, $lte: currentTime } }).count();

    console.log(`Real-time available tutors: ${count}  at ${currentTime}`);

  } catch (error) {

    console.error('Error counting available tutors:', error);

  }
};

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connectec to DB");
        console.log(`server is running on port ${process.env.port}`);
        
        cron.schedule('* * * * * *', countAvailableTutors);
        
    } catch (error) {
        console.log(error.message);
    }


})

