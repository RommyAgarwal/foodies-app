const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const viewRouter = require("./Router/viewRouter");
const bookingRouter = require("./Router/bookingRouter");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

//tracks incoming requests and see there is data and will fed in req.body
app.use(express.json());
app.use( express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.set("view engine" , "pug");
app.set("views" , path.join(__dirname,"View"));

app.use("/api/booking" , bookingRouter);
app.use("/api/plans" , planRouter);
app.use("/api/user" , userRouter);
app.use("" , viewRouter);

let port = process.env.PORT || 3000;

app.listen(port , function(){
    console.log("server started at port 3000");
})