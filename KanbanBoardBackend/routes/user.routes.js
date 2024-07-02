const express = require("express");
const UserModel = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blacklist.model");
require("dotenv").config();

const tokenSecretKey = process.env.JWT_SECRET_KEY;
const refreshTokenSecretKey = process.env.REFRESH_JWT_SECRET_KEY;

userRouter.post('/register', async (req,res)=>{
    const { email, password, name, role } = req.body;
    try {
        const findUser = await UserModel.findOne({email})
        if(findUser){
            return res.status(200).send({msg: "User with this Email already exists, Please Login or register using different Email."});
        }
        bcrypt.hash(password, 8, async (err, hash)=>{
            if(err) res.status(500).send({msg: "Error occured while hashing the password"});
            
            const newUser = new UserModel({email, password:hash, name, role});
            await newUser.save();
            res.status(200).send({msg: "User Registration Successful."});
        })
    } catch (error) {
        console.log(error);
        res.status(415).send({msg: "User Registration Failed."})
    }
})

userRouter.post('/login', async (req,res)=>{
    const {email, password} = req.body;

    try {
        const findUser = await UserModel.findOne({email});
        const {_id, name, role} = findUser;
        if(findUser){
            bcrypt.compare(password, findUser.password, (err, result)=>{
                if(err) res.status(500).send({msg: "error occured while comparing passwords"});
                if(result){
                    const token = jwt.sign({_id, name, role}, tokenSecretKey , {expiresIn: "1hr"});
                    const refreshToken = jwt.sign({_id, name, role}, refreshTokenSecretKey , {expiresIn: "1d"});
                    res.status(200).send({msg:"Login Successful", token: token, refreshToken: refreshToken});
                }else{
                    res.status(401).send({msg: "Invalid Credentials"});
                }
            })
        }else{
            res.status(401).send({msg: `User not found with email:${email}`});
        }
    } catch (error) {
        console.log(error);
        res.status(415).send({msg: "Login Failed"});
    }
})

userRouter.post("/logout", async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    let blacklistToken = new BlacklistModel({ token });
    await blacklistToken.save();
    res.status(200).send({ "msg":"user logged out successfully."});
  });

module.exports = userRouter;