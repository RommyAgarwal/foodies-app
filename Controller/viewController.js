const planModel = require("../Model/plansModel");

// function getDemoPage(req , res){
//     res.render("base.pug");
// }
function getResetPasswordPage(req,res){
    res.render("resetPassword.pug",{name:req.name} );
}

async function getHomePage(req , res){
    try{
        let plans =  await planModel.find();
        plans = plans.splice(0,3);
        res.render("home.pug" , {name:req.name ,plans});
    }
    catch(error){
        console.log(error);
    }
}

function getLoginPage(req,res){
    res.render("login.pug", {name:req.name});
}

function getSignUpPage(req,res){
    res.render("signup.pug", {name:req.name});
}

function getProfilePage(req,res){
    res.render("profilePage.pug"  , {user: req.user});
}

async function getPlansPage(req,res){
    try{
        let plans = await planModel.find();
        res.render("plans.pug" , { plans:plans, name:req.name });
    }
    catch(error){

    }
}



//module.exports.getDemoPage = getDemoPage;
module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignUpPage = getSignUpPage;
module.exports.getPlansPage = getPlansPage;
module.exports.getResetPasswordPage = getResetPasswordPage;
module.exports.getProfilePage = getProfilePage;
