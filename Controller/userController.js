// const userDB = require("../Model/userModel.json");
// const { v4 : uuidv4} = require("uuid");
// const fs = require("fs");
// let path = require("path");

const userModel = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
// const { SECRET_KEY, GMAIL_PW, GMAIL_ID } = require("../config/secrets");

const SECRET_KEY = process.env.SECRET_KEY;
const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_PW = process.env.GMAIL_PW;



async function getAllUser(req,res){

    try{
        let users = await userModel.find({});
        res.status(200).json({
            message:"Got all users succeccfully",
            data : users
        })
    }
    catch(error){
        res.status(501).json({
            message:"Failed to get all users",
            error
        })
    }

    // if(userDB.length){
    //     res.status(200).json({
    //         message:"Got all users successfully",
    //         data: userDB
    //     })
    // }
    // else{
    //     res.status(200).json({
    //         message:"No users found !!!"
    //     })
    // }
}
async function getUserById(req,res){

    try{
        let id = req.id;
        let user = await userModel.findById(id);
        res.status(200).json({
            message : "Successfully got user by id",
            data: user
        })
    }
    catch(error){
        res.status(404).json({
            message : "user not found !!!",
            error:error
        })
    }
    // try{
    //     let {id} = req.params;
        // let user = await userModel.findById(id);
        // res.status(200).json({
        //     message : "Successfully got user by id",
        //     data: user
        // })
    // }
    // catch(error){
        // res.status(404).json({
        //     message : "user not found !!!",
        //     error:error
        // })
    // }
    
    
    // let filteredUsers = userDB.filter(function(user){
    //     return user.id == id;
    // })
    // if(filteredUsers.length){
    //     res.status(200).json({
    //         message:"Successfully get user by id",
    //         data: filteredUsers[0]
    //     })
    // }
    // else{
    //     res.status(404).json({
    //         message : "User not found !!!",
    //     })
    // }
}
async function updateUserById(req,res){
    
    try{
        let token = req.cookies.jwt;
        let payload = jwt.verify(token , SECRET_KEY);
        let {updateObj} = req.body;
        let user = await userModel.findById(payload.id);
        for(key in updateObj){
            user[key] = updateObj[key];
        }
        let updatedUser = await user.save();

        res.status(201).json({
            message : "User updated",
            data:updatedUser
        })
    }
    catch(error){
        res.status(200).json({
            message : "failed to update user",
            error:error
        })
    }

    // let filteredUsers = userDB.filter(function(user){
    //     return user.id == id;
    // })
    // let plansPath = path.join(__dirname,"..",'Model','userModel.json');
    // if(filteredUsers.length){
    //     let user = filteredUsers[0];
    //     for(key in updateObj){
    //         user[key] = updateObj[key];
    //     }
    //     fs.writeFileSync(plansPath, JSON.stringify(userDB));
    //     res.status(200).json({
    //         message : "User updated"
    //     })
    // }
    // else{
    //     res.status(404).json({
    //         message : "User not found"
    //     })
    // }

}
async function createUser(req,res){
    try{
        let sentUser = req.body;
        let user = await userModel.create(sentUser);
        res.status(200).json({
                    message:"User Created Successfully",
                    data:user
        })
    }
    catch(error){
        res.status(501).json({
            message:"Failed to create an User",
            error:error.errors.confirmPassword.message
        })
    }
}
async function deleteUserById(req,res){

    try{
        let id = req.id;
        let deletedUser = await userModel.findByIdAndDelete(id);
        if(deletedUser){
            res.status(200).json({
            message : "User deleted",
            data:deletedUser
            })
        }
        else{
            res.status(200).json({
                message : "User not found !!"
                })
        }
    }
    catch(error){
        res.status(501).json({
            message : "User failed to delete",
            error
        })
    }



    // let {id} = req.params;
    // let filteredUsers = userDB.filter(function(user){
    //     return user.id != id;
    // })
    // let plansPath = path.join(__dirname,"..",'Model','userModel.json');
    // if(filteredUsers.length == userDB.length){
    //     res.status(404).json({
    //         message : "User not found"
    //     })
    // }
    // else{
    //     fs.writeFileSync(plansPath, JSON.stringify(filteredUsers));
    //     res.status(200).json({
    //         message : "Successfully deleted user"
    //     })
    // }

}
async function updateProfilePhoto(req,res){
    try{
        let file = req.file;
        console.log(file);
        let imagePath = file.destination + file.filename;
        // console.log(imagePath);
        imagePath = imagePath.substring(6);
        console.log(imagePath);
        let id = req.id;
        let user = await userModel.findById(id);
        user.pImage = imagePath;
        await user.save({validateBeforeSave:false});
        res.status(200).json({
            message:"Profile Photo updated !!"
        })
    }
    catch(error){
        res.status(200).json({
            message:"failed to update photo",
            error
        })
    }
}

module.exports.getAllUser = getAllUser;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.createUser = createUser;
module.exports.deleteUserById = deleteUserById
module.exports.updateProfilePhoto = updateProfilePhoto;
