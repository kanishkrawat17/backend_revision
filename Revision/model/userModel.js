const mongoose = require("mongoose");
const {PASSWORD} = require("../../secrets.js");
const validator = require("email-validator");

let dbLink = `mongodb+srv://food-1:${PASSWORD}@cluster0.l0ekj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;   

    mongoose.connect(dbLink)
        .then((res)=>{
            console.log("9",res,"db Connected");
        })
        .catch((err)=>{
            console.log("12",err.message);
        })


const userSchema = new mongoose.Schema(
  {
    name :{
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true,
        validate : function(){
            return validator.validate(this.email)
        }
    },
    password:{
        required : true,
        type :String,
        minlength : 8
    },
    confirmPassword : {
        required : true,
        type :String,
        minlength : 8,
        validate : function(){
            return this.password == this.confirmPassword
        }
    }
  }
)
userSchema.pre()
const userModel = mongoose.model('userModel', userSchema);

module.exports=userModel;