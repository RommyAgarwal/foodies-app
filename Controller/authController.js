const userModel = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
// const { SECRET_KEY, GMAIL_PW, GMAIL_ID } = require("../config/secrets");

const nodemailer = require("nodemailer");
const bookingModel = require("../Model/bookingModel");
//const smtptransport = require("nodemailer-smtp-transport");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const SECRET_KEY = process.env.SECRET_KEY;
const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_PW = process.env.GMAIL_PW;


async function sendMail(message){
    try{

        const transporter = nodemailer.createTransport({
            service:"gmail",
            host: "smtp.gmail.com",
            secure:true,
            auth: {
              user: GMAIL_ID,
              pass: GMAIL_PW
            }
          });

          let res = await transporter.sendMail({
            from: message.from, // sender address
            to: message.to, // list of receivers
            subject: message.subject, // Subject line
            text:message.text // plain text body
            // html: "<b>Hello I am testing something</b>", // html body
          });
          return res;
    }
    catch(error){
        return error;
    }
}
async function signup(req,res){

    try{
        let user = req.body;
         let newUser = await userModel.create({
            name:user.name,
            email:user.email,
            password:user.password,
            confirmPassword:user.confirmPassword,
            role:user.role
        })
        res.status(201).json({
            message:"Successfully signed up",
            data: newUser
        })
    }
    catch(error){
        res.status(501).json({
            message:"Failed to sign up !!",
            error
        })
    }
}

async function login(req,res){

    try{
        let {email,password} = req.body;
        let loggedInUser = await userModel.find({email:email});
        if(loggedInUser.length){
            let user = loggedInUser[0];
            if(user.password == password){
                const token = jwt.sign({ id : user["_id"]}  , SECRET_KEY );
                res.cookie('jwt' , token, {httpOnly:true});
                // //res.redirect("/");
                res.status(200).json({
                    message:"Logged in successfully",
                    data: loggedInUser[0],
                    // token
                })
            }
            else{
                //res.render("login.pug", {message:"Email and Password Didn't Match"});
                res.status(200).json({
                    message:"Email and Password Didn't Match"
                })
            } 
        }
        else{
            //res.render("login.pug", {message:"No User Found SignUp First"});
            res.status(200).json({
                message:"No User Found SignUp First"
            })
        }
    }
    catch(error){
        //res.render("login.pug", {message:"Logged in failed"});
        res.status(200).json({
            message:"Logged in failed",
            error
        })
    }
}

async function logout(req,res){
    try{
        res.clearCookie("jwt");
        res.redirect("/login");
    }
    catch(error){
        res.status(501).json({
            error
        })
    }
}

async function isLoggedIn(req,res,next){
    try{
        let token = req.cookies.jwt;
        let payload = jwt.verify(token , SECRET_KEY);
        if(payload){
            let user = await userModel.findById(payload.id)
            req.name = user.name;
            req.user = user;
            const userBookingObject = await bookingModel.findById(user.bookedPlanId);
            let plansName = [];
            for(let i=0;i<userBookingObject.bookedPlans.length;i++){
                plansName.push(userBookingObject.bookedPlans[i].name);
            }
            req.plansArray = plansName;
            console.log(req.plansArray);
            next();
        }
        else{
            next();
        }
    }
    catch(error){
        next();
    }
}

async function protectRouter(req,res,next){
    try{
        //const token = req.headers.authorization.split(" ").pop();
        let token = req.cookies.jwt;
        // console.log(token);
        let payload = jwt.verify(token , SECRET_KEY);
        if(payload){
            req.id = payload.id;
            next();
        }
        else{
            res.status(501).json({
                message:"Please Log in !!"
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"Please Log in !!",
            error
        })
    }
    
}

async function isAuthorized(req,res,next){
    try{
        let id = req.id;
        let user = await userModel.findById(id);
        if(user.role == 'admin'){
            next();
        }
        else{
            res.status(200).json({
                message:"You don't have admin rights !!!"
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"Failed to Authorize",
            error
        })
    }
}

async function forgetPassword(req,res){

    try{
        let {email} = req.body;
        let user = await userModel.findOne({email:email});
        if(user){
            let token = user.createPwToken();
            await user.save({validateBeforeSave:false});
            let resetLink = `https://foodiesssss.herokuapp.com/resetPassword/${token}`;
            let message = {
                from:"rommyagarwal1@gmail.com",
                to: email,
                subject:"Reset Password",
                text:resetLink
            }
            let response = await sendMail(message);
            //const pwtoken = obj.data.querySelector.pwToken;
            //res.cookie('pwToken' , token, {httpOnly:true});
            res.status(201).json({
                message:"Reset Link is sent",
                user
                // resetLink
            })
            
        }
        else{
            res.status(404).json({
                message:"User not found ! Sign up first"
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"Failed to forget Password",
            error
        })
    }
}

async function resetPassword(req,res){
    try{
        const token = req.body.token;
        const { password , confirmPassword} = req.body;
        const user = await userModel.findOne({
            pwToken:token,
            tokenTime : { $gt : Date.now()}
        })
        if(user){
            user.resetPasswordHandler(password , confirmPassword);
            await user.save();
            res.status(200).json({
                message:"Password Reset Successfully",
                user
            })
        }
        else{
            res.status(200).json({
                message:"Password Reset Link Expired"
            })
        }
    }
    catch(error){
        res.status(200).json({
            message:"Failed to reset password",
            error
        })
    }
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.protectRouter = protectRouter;
module.exports.isAuthorized = isAuthorized;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPassword = resetPassword;
module.exports.isLoggedIn = isLoggedIn;
module.exports.logout = logout;