const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../secrets");

module.exports.protectRoute=function (req,res,next){
    try{
      console.log("99",req.cookies);
      let decryptedToken = jwt.verify(req.cookies.jwt, JWT_SECRET);
      console.log("101",decryptedToken);
      
      if(decryptedToken){
        next();
      } else{
        res.send({
          message : "kindly login to access this resource "
        })
      }
    }
    catch(err){
      console.log("108",err.message);
      res.send({
        message:err.message
      })
    }
  }

module.exports.bodyChecker = function (req, res, next) {
    // middle ware function
    console.log("reached body checker");
    let isPresent = Object.keys(req.body).length;
    console.log("ispresent", isPresent);
    if (isPresent) {
      next();
    } else {
      res.send("kind send details in body ");
    }
  }