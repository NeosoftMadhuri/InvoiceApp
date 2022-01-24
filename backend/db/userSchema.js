const mongoose=require('mongoose');
const catSchema=new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    pass:{type:String,required:true},
    mobile:{type:Number,required:true},
    uname:{type:String,required:true}


})

module.exports=mongoose.model("user",catSchema);