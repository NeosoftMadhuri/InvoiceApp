const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');
const helpers=require('../helpers/helpers')
// router.use(express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads')
    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            req.fileValidationError = "Forbidden extension"
            cb(null, false, req.fileValidationError);
        }
    }
});

router.post('/uploaddata',upload.single('file'),(req,res)=>{
    console.log(req.body)
    
    let logo=req.file.filename;
    console.log(logo)
   
})

module.exports=router;