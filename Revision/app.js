const express = require("express");
const fs = require("fs");
const app = express();

app.listen("8081", () => {
  console.log("App is listening on port number 8081");
});

app.use(express.json());
app.use(express.json());
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

function signupUser(req, res) {
  let { name, email, password, confirmPassword } = req.body;
  console.log("req.body", req.body);
  if (password == confirmPassword) {
    let newUser = { name, email, password };
    // entry put
    content.push(newUser);
    // save in the datastorage
    fs.writeFileSync("./data.json", JSON.stringify(content));
    res.status(201).json({
      createdUser: newUser,
    });
  } else {
    res.status(422).json({
      message: "password and confirm password do not match",
    });
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
      res.send({
        message: "you have acces, correct email and pswrd",
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