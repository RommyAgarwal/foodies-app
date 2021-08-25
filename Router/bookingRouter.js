const express = require("express")
const { protectRouter } = require("../Controller/authController");
const { createPaymentSession, checkoutComplete } = require("../Controller/bookingController");
const bodyParser = require("body-parser");
const bookingRouter = express.Router();

bookingRouter.post("/createPaymentSession" , protectRouter , createPaymentSession)
bookingRouter.post("/checkoutComplete" , bodyParser.raw({type: 'application/json'}), checkoutComplete);





module.exports = bookingRouter;