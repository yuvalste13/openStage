const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
var $ = require("jquery");
const stages = require(__dirname + "/stages.js");
const ld = require("lodash");


const stageList = stages.stages;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

const CityList = ["Ashdod","Ashkelon","beer sheva"];

app.get("/",function(req,res){
  res.render("index",{CityList: CityList, StageList: stageList});
});

// app.post("/",function(req,res){
//   var day = req.body.button;
//   DayList = [day];
//
//   res.render("index",{CityList: CityList,DayList: DayList});
//
// });



// listening to a dinamic port (for using heroku) and on our localhost at port 3000
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});


// mailChimp API key
// a68463a7095edb0b0fc6fd56c7472d4d-us14
// List ID
// 5546f78779
