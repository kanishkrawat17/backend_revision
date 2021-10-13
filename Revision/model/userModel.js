const mongoose = require("mongoose");
const {PASSWORD} = require("../secrets.js");
const validator = require("email-validator");

let dbLink = `mongodb+srv://food-1:${PASSWORD}@cluster0.l0ekj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;   

    mongoose.connect(dbLink)
        .then((res)=>{
            console.log("9",res,"db Connected");
        })
        .catch((err)=>{
            console.log("12",err.message);
        })

//mongoose -> data -> exact -> data -> that is required to form an entity 
//  data completness , data validation
// name ,email,password,confirmPassword-> min ,max,confirmPassword,required ,unique 

const userSchema = new mongoose.Schema(
  {
    name :{
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true,
        unique: true,
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
    },
    createdAt : {
        type : String
    },
    token : String,
    validUpto : Date,
    role : {
        type:String,
        enum  : ["admin", "ce"],
        default : "user"
    }
  })

  // hook-> before getting saved into database make confirm pwd undefined
userSchema.pre('save',function(next){
    this.confirmPassword = undefined;
    next(); 
})

// ?? How did this happend ??
userSchema.methods.resetHandler = function (password, confirmPassword) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.token = undefined;
}

const userModel = mongoose.model('userModel', userSchema);

module.exports=userModel;



