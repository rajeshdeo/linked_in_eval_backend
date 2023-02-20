const express= require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model");
const userRouter= express.Router();


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}= req.body;
 
    try{

        bcrypt.hash(password, 5, async(err, hash) =>{
          
            if(err){
                    res.send({"Msg":"Something went wrong in hashing"})
            }
            else{
                const user= new UserModel({name,email,gender,password:hash,age,city});
               // console.log(user);
                await user.save();
                res.send({"Msg":"User Registered",user});
            }
        });
            
    }
    catch(err){
        res.send({"msg":"Error in register"})
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user= await UserModel.find({email})
        if(user.length>0)
        {
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    let token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({"Msg":"Logged in",token})
                }
                else{
                    res.send({"Msg":"Something wrong in generate token"})
                }
            });
            
            
        }

    }
    catch(err){
        res.send({"Msg":"Wrong in Log in"})
    }
})


module.exports={userRouter};