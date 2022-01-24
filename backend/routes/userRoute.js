const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const jwtSecrete = "asd889asdas5656asdas887";
const catUserModel = require('../db/userSchema');
const nodemailer=require('nodemailer');
const multer=require('multer');
const storage=multer.memoryStorage();
var upload =multer({storage:storage});

//REGISTER ROUTE
router.post("/register", (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let pass = req.body.password;
    let mobile = req.body.mobile;
    let uname = req.body.uname;
    let ins = new catUserModel({ fname: fname, lname: lname, email: email, pass: pass, mobile: mobile, uname: uname });
    ins.save((err) => {
        if (err) {
            res.json({ "err": 1, 'msg': 'Not Registered' })
        }
        else {
            res.json({ "err": 0, 'msg': 'Registered' })
        }
    })
})

//LOGIN ROUTE
router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    catUserModel.find({ email: email, pass: password }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecrete, { expiresIn: 360000 })
            res.json({ "err": 0, "msg": "Login Success", "token": token })
        }

    })

})

router.post('/sendmail', upload.single('file'), (req,res)=>{
    console.log(req.file.buffer)
 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sandagemadhuri@gmail.com',
        pass: 'Madhuri@13s'
      }
    });
    
    var mailOptions = {
      from: 'sandagemadhuri@gmail.com',
      to: 'sandagemadhuri@gmail.com',
      subject: 'Invoice PDF',
      text:
       `
       Dear Customer,

       Your Have Successfully downloaded the pdf.
       
       Thank You!`,
       attachments:[
           {
               filename:"invoice.pdf",
                content:req.file.buffer,
        },
       ]
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send("Email Sent!")
  })

module.exports = router;