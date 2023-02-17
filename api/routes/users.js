const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password,10,(err, hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                userName: req.body.userName,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                Role: req.body.Role
            })
            user.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        newUser: result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})


router.post('/login',(req,res,next)=>{
    User.find({userName:req.body.userName})
    .exec()
    .then(user=>{
        if(user.length < 1)
        {
            return res.status(401).json({
                msg: 'User does not exists'
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    msg: 'Password does not exists'
                })
            }
            if(result){
                const token = jwt.sign({
                    userName:user[0].userName,
                    Role:user[0].Role,
                    email:user[0].email,
                    phone:user[0].phone
                },
                'token verification dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    userName:user[0].userName,
                    Role:user[0].Role,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})




module.exports = router;