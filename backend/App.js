const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
const PORT=9988;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//dbconnection
const db="mongodb://localhost:27017/Invoice";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MongoDb connected")
    }
    catch(err){
        console.log(err.message)
    }
}
connectDB()
//end


//Routes

const userRoute=require('./routes/userRoute');
const settingRoute=require('./routes/settingRoute')
const invoiceRoute=require('./routes/invoiceRoute')
const demoRoute=require('./routes/demoRoute');

//API CALL
app.use("/api/user",userRoute);
app.use("/api/profile",settingRoute);
app.use("/api/invoice",invoiceRoute);
app.use("/api/upload",demoRoute);
app.listen(PORT,(err)=>{
    if (err) throw err
    console.log(`Work on ${PORT}`);
})