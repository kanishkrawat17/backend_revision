const express = require("express");
const fs = require("fs");
const app = express();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("./secrets.js");
const cookieParser = require('cookie-parser')
const userModel = require("./model/userModel")
 

app.listen("8081", () => {
  console.log("App is listening on port number 8081");
});

app.use(express.json());
app.use(cookieParser())
app.use(express.static("Frontend-folder"));

let content = JSON.parse(fs.readFileSync("./data.json"));

const authRouter = express.Router();
const userRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

authRouter.route("/signup")
    .post(bodyChecker, signupUser);

authRouter.route("/login")
    .post(bodyChecker, loginUser);

userRouter.route("/")
    .get(protectRoute,getUsers)

function bodyChecker(req, res, next) {
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

async function signupUser(req, res) {
  
    try {
        let document =  await userModel.create(req.body)
        res.status(200).json({
          message : "User created successfullt",
          user : document
        })
      }
      catch(err){
        console.log("57",err.message);
        res.status(500).send({
          message :err.message
        })
      }
}

function loginUser(req, res, next) {
  let userDetails = req.body;
  let { email, password } = userDetails;

  
  let obj = content.find((obj) => {
    return obj.email == email;
  });
  
  if (obj != undefined) {
    if (obj.password == password) {
      const token = jwt.sign({ obj: obj.email }, JWT_SECRET);
      console.log("80",token);
      res.cookie('jwt',token)
      res.send({
        message: "you have acces,correct email and pswrd",
        obj,
      });
    } else {
      res.send({
        message: "Invalid password or email",
      });
    }
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }
}

function protectRoute(req,res,next){
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

function getUsers(req,res){
  res.json({
    content
  })
}

app.use(function(req,res){
    res.status(404).sendFile(__dirname+"/404.html");
})



// // // app.get("/", getUser);
// // // app.post("/user", createUser);

// // // function getUser(req, res, next) {
// // //   console.log("inside getUser");
// // //   res.send({
// // //     message: content,
// // //   });
// // // }

// // // function createUser(req, res, next) {
// // //   let body = req.body;

// // //   for (let key in content) {
// // //     body[key] = content[key];
// // //   }
// // //   res.json({
// // //     message: body,
// // //   });
// // // }

// // // let content = {
// // //     "name" : "kan"
// // // }

// // // let body = {
// // //     "age": "023",
// // //     "name": "afds"
// // // }

// // // for(let key in content){
// // //     body[key] = content[key];
// // // }

// // // console.log(body);

// // // let a = ["name", "john"]
// // // let[john, name] = a;

// // // console.log("john",name);
// // // console.log("name",john);

// // // let options = {
// // //     breadth: 500,
// // //     width: 100,
// // //     height: 200
// // //   };

// // // let {a, b, c} = options;

// // // console.log("breadth",a);
// // // console.log("width",b);
// // // console.log("height",c);

// // --------------------------------------------------------

// // find-> returs first matching elt otherwise null(if doesn't match)

// // let obj = [

// //     {
// //           email : "abc@gmail.com",
// //           age : 1
// //     }  ,
// //     {
// //         email : "aa@gmail.com",
// //         age : 2
// //     }

// // ]

// // let email  = "adewa@gmail.com"

// //     let objectReturnedByFind = obj.find((obj)=>{
// //         return obj.email == email;
// //     })
// //     // console.log( typeof(objectReturnedByFind) );
// //     if(objectReturnedByFind != undefined){
// //         console.log("Not undefined ",objectReturnedByFind);

// //     } else{
// //         console.log("undefined ",objectReturnedByFind);
// //     }


// const axios = require("axios");
// (async function test(){
//     let user = await axios.post('/user', { firstName: 'Fred', lastName: 'Flintstone'})
//     console.log(user);
// })();


//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });