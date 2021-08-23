const express = require("express");
const { isLoggedIn, logout } = require("../Controller/authController");
const { getHomePage, getLoginPage, getSignUpPage, getPlansPage, getResetPasswordPage, getProfilePage } = require("../Controller/viewController");
const viewRouter = express.Router();

viewRouter.use(isLoggedIn);
viewRouter.route("").get(getHomePage);
// viewRouter.route("/home").get(getHomePage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignUpPage);
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/resetPassword/:token").get(getResetPasswordPage);
viewRouter.route("/profile").get(getProfilePage);

module.exports = viewRouter;