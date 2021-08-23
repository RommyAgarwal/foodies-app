const mongoose = require("mongoose");
// const { DB_LINK } = require("../config/secrets");
const crypto = require("crypto");
const DB_LINK = process.env.DB_LINK;


mongoose.connect(DB_LINK , { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => { console.log("connected to db") });


let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true,    
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        minLength: [ 6 , "password must be greater than 6 characters"],
        required:true
    },
    confirmPassword : {
        type:String,
        minLength: [ 6 , "password must be greater than 6 characters"],
        validate : {
            validator : function(){
                return this.password == this.confirmPassword;
            },
            message:"Password didn't match"
        }
    },
    role : {
        type : String,
        enum : ["admin" , "user" , "restaurant owner" , "delivery boy"],
        default:"user"
    },
    pImage:{
        type:String,
        default:"/images/users/default.png"
    },
    pwToken : String,
    tokenTime : String,
    bookedPlanId:{
        type:String
    }
})
//it will run before create is calle on userModel
userSchema.pre("save" , function(){
    this.confirmPassword = undefined;
})

userSchema.methods.createPwToken = function(){
    let token = crypto.randomBytes(32).toString("hex");
    let time = Date.now() * 60 * 10 * 1000;

    this.pwToken = token;
    this.tokenTime = time;
    return token;
}

userSchema.methods.resetPasswordHandler = function(password , confirmPassword){
    this.pwToken=undefined;
    this.tokenTime = undefined;
    this.password = password;
    this.confirmPassword = confirmPassword;
}


const userModel = mongoose.model("usersscollection" , userSchema);
module.exports = userModel;