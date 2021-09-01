const express = require("express");
const { signup, login, protectRouter , forgetPassword, resetPassword} = require("../Controller/authController");
const { getAllUser, createUser, getUserById, updateUserById, deleteUserById, updateProfilePhoto } = require("../Controller/userController");
const userRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/images/users')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpg")
    }
})
function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    if(file.mimetype.includes("image")){
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
    else{
        // To reject this file pass `false`, like so:
        cb(null, false)
    }
  
  
    // // You can always pass an error if something goes wrong:
    // cb(new Error('I don\'t have a clue!'))
  
}

const upload = multer({ storage: storage , fileFilter:fileFilter});



userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forgetPassword" , forgetPassword);
userRouter.patch("/resetPassword/:token" , resetPassword);
//userRouter.route("").get(getAllUser);
userRouter.use(protectRouter);
userRouter.patch("/updateProfilePhoto", upload.single("user") ,  updateProfilePhoto);
userRouter.route("").get(getUserById).patch(updateUserById).delete(deleteUserById);


module.exports = userRouter;