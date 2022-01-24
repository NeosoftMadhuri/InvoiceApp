const mongoose=require('mongoose');
const catSchema=new mongoose.Schema({
    clogo:{type:String,required:true}
})

module.exports=mongoose.model("demo",catSchema);