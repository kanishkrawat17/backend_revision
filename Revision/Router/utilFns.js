const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../secrets");

module.exports.protectRoute=function (req,res,next){
    try{
      //cookie - parser
      console.log("99",req.cookies); // this comes because of cookie-parse 
      // jwt 
      // -> verify everytime that if 
      // you are bringing the token to get your response , req.cookie are coming bcs of json webtoken
      let decryptedToken = jwt.verify(req.cookies.jwt, JWT_SECRET);
      console.log("101",decryptedToken);
      
      if(decryptedToken){
        let userId = decryptedToken.id; // this is bcs to check for authorized thing bcs in payload while loggin in we are sending JWT to client side in which payload has userID (mongoDB)
        req.userId = userId;
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




