const axios = require("axios")
const express = require("express");
var bodyParser = require('body-parser')
const app = express(); 
const mongoose =require("mongoose");
const dotenv =require("dotenv");
const helmet =require("helmet");
const morgan =require("morgan");
var cors = require('cors');
var cookieParser = require('cookie-parser')
var cron = require('node-cron');
const userRoute = require("./routes/users.js");
const partnerRoute = require("./routes/partner.js");
const { get } = require("jquery");


mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true

}, ()=>{

console.log("connected to mongodb")

});



//middleware
app.use(cors({origin: '*' , credentials: true }))
app.use(express.json());
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users" , userRoute);
app.use("/api/partner" , partnerRoute);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get('/', function(req, res, next) {

    next();
  });
  
  app.post('/', function(req, res, next) {
   
   // Handle the post for this route
  });
  


app.listen(8800, ()=> console.log("Server2 running..22..."))
