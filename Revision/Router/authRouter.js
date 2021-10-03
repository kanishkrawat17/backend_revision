const express = require("express");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../secrets");
const authRouter = express.Router();
const {bodyChecker} = require("./utilFns")
const authRouter = express.Router();

authRouter.route("/signup")
    .post(bodyChecker, signupUser);

authRouter.route("/login")
    .post(bodyChecker, loginUser);

async function signupUser(req, res) {
  try {
    let document = await userModel.create(req.body);
    res.status(200).json({
      message: "User created successfullt",
      user: document,
    });
  } catch (err) {
    console.log("57", err.message);
    res.status(500).send({
      message: err.message,
    });
  }
}

async function loginUser(req, res, next) {
  try {
  let {email,password } = req.body;
  let user = await userModel.findOne({email});
  if(user){
    if(user.password === password){
        let token = jwt.sign({id : user["_id"]}, JWT_SECRET, {httpsOnly : true})
        res.cookie("jwt",token)
        res.status(200).json({
            data : user,
            message :"user logged in successfully"
        })
    } else{
        res.status(404).json({
            message: "email or password is incorrect"
        })
    }
  }
} catch (err){
    message : "Kindly sign up"
}
}







module.exports = authRouter;
