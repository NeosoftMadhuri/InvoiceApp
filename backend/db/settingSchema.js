const mongoose=require('mongoose');
const catSchema=new mongoose.Schema({
    clogo:{type:String,required:true},
    cname:{type:String,required:true},
    cemail:{type:String,required:true,unique:true},
    caddress:{type:String,required:true}

})

module.exports=mongoose.model("setting",catSchema);