const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const db = require("./DB/db");
const userRoute = require("./route/userRoute")
const businessRoute = require("./route/businessRoute");
const categoryRoute =require("./route/categoryRoute");
const customerRoute = require("./route/customerRoute")

const app = express();
app.use(express.json());
app.use("/", userRoute);
app.use("/", businessRoute);
app.use("/",categoryRoute);
app.use("/",customerRoute);
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log("Server Started",port);
    db()
})