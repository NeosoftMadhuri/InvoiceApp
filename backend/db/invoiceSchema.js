const mongoose=require('mongoose');
const catSchema=new mongoose.Schema({
     insnum:{type:String,required:true},
     rname:{type:String,required:true},
     remail:{type:String,required:true},
    raddress:{type:String,required:true},
    insdate:{type:Date,required:true},
    ins_duedate:{type:Date,required:true},
    insamount:{type:Number,required:true},
    status:{type:String,require:true},
    product:{type:Array,required:true}

    
})

module.exports=mongoose.model("invoice",catSchema);