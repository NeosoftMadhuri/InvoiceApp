const express = require('express')
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose')
const catModel=require('../db/settingSchema')
const jwt = require('jsonwebtoken');
const helpers=require('../helpers/helpers')
const jwtsecret = "asd889asdas5656asdas887";
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token===null){
        
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtsecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                next();
            }
        })
    }
}
//SETTING ROUTE
router.post("/setting", (req, res) => {
    console.log("Setting")
    console.log(req.body)
    // console.log(req.file);
    // let cname=req.body.cname;
    // let cemail=req.body.cemail;
    // let caddress=req.body.caddress;
    // let ins=new catModel({cname:cname,cemail:cemail,caddress:caddress})
    // console.log(ins)
    // ins.save((err)=>{
    //     if(err){
    //         res.json({"err":1,'msg':'Not Saved'})
    //     }
    //     else
    //     {
    //         res.json({"err":0,'msg':"Saved"})
    //     }
    // })
    let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).single('myfile');
    upload(req,res,(err)=>{
        if(req.fileValidationError){
            res.send(req.fileValidationError);
        }
       else if(!req.file){
           res.send("Please select a file");
       }
       else if(err){
           res.send("SOme uploading error");
       }
    let clogo=req.file.filename;
    console.log(clogo)
    let ins=new catModel({cname:cname,cemail:cemail,caddress:caddress,clogo:clogo})
    console.log(ins)
    ins.save((err)=>{
        if(err){
            res.json({"err":1,'msg':'Not Saved'})
        }
        else
        {
            res.json({"err":0,'msg':"Saved"})
        }
    })
    })
})

router.get("/getdata",(req,res)=>{
    catModel.find({},(err,data)=>{
        if(err) res.json({'err':err})
        res.json({profile:data})
    })
})
module.exports = router;
