const express = require("express")
const { protectRouter } = require("../Controller/authController");
const { createPaymentSession, checkoutComplete } = require("../Controller/bookingController");

const bookingRouter = express.Router();

bookingRouter.post("/createPaymentSession" , protectRouter , createPaymentSession)
bookingRouter.post("/checkoutComplete" , checkoutComplete);





module.exports = bookingRouter;