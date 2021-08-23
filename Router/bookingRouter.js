const express = require("express")
const { protectRouter } = require("../Controller/authController");
const { createPaymentSession } = require("../Controller/bookingController");

const bookingRouter = express.Router();

bookingRouter.post("/createPaymentSession" , protectRouter , createPaymentSession)






module.exports = bookingRouter;