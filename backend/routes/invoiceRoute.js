const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const catModel=require('../db/invoiceSchema')
const userModel=require('../db/userSchema')

//PRODUCT ROUTE
router.post("/addinvoice",(req,res)=>{
    console.log(req.body.remail)
    let insnum=req.body.insnum;
    let rname=req.body.rname;
    let remail=req.body.remail;
    let raddress=req.body.raddress;
    let insdate=req.body.insdate;
    let ins_duedate=req.body.ins_duedate;
    let insamount=req.body.insamount;
    let product=req.body.product.productdata;
    let status="unpaid";
    let ins=new catModel({insnum:insnum,rname:rname,remail:remail,raddress:raddress,insdate:insdate,ins_duedate:ins_duedate,insamount:insamount,status:status,product:product})
   console.log(ins)
    ins.save((err)=>{
        if (err) {
            res.json({ "err": 1, 'msg': 'Invoice Not Added' })
        }
        else {
            userModel.find({},(err,data)=>{
                if(err){
                    res.json({err:"Person Error"})
                }
                else
                {
                    let userdata={}
                    let fulldata={}
                }
            })
            res.json({ "err": 0, 'msg': 'Invoice  Added' })
        }
    })
})

router.get("/getinvoice",(req,res)=>{
    catModel.find({},(err,data)=>{
        if (err) {
            res.json({ "err": 1, "msg": "Something wrong" })
        }
        else   {
            res.json({'data':data})
        }
    })
})

router.post("/updateinvoice/:insnum",(req,res)=>{
console.log("update status")
let insnum=req.params.insnum;
console.log(insnum)
// let status=req.body.status;
// console.log(status)
    catModel.updateOne({insnum:insnum},{$set:{status:"Paid"}},(err)=>{
        if(err){
            res.json({'err':"Update Error"})
        }
        else{
            res.json({msg:"Status updated successfully"});
        }
    })
})
module.exports=router;