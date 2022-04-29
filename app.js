const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
var $ = require("jquery");
const stages = require(__dirname + "/stages.js");
const lodash = require("lodash");
const app = express();
var fs = require('fs');
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));


// stageList contains all the javascript objects for the known stages
// the info comes from the stages.json file
let stageList = stages.Stage({});
console.table(stageList);
// let CityList = ["Ashdod","Ashkelon"];
CityList = stages.CityList(stageList);


app.get("/",function(req,res){
  CityList = stages.CityList(stageList);
  res.render("index",{CityList: CityList, StageList: stageList});
});
app.get("/stages/:stageName",function(req,res){
  //listening for a /stages/:stageName for sending the stages info
  const requestedTitle = lodash.lowerCase(req.params.stageName);
  stageList.forEach(function(stage){
    if (lodash.lowerCase(stage.Name) === requestedTitle){
      res.render("selection",{CityList: CityList, StageList: stageList ,Stage: stage});
    }
  });
});
app.get("/rank",function(req,res){
  res.render("rank");
})
app.get("/:topic",function(req,res){
  const requestedTitle = lodash.lowerCase(req.params.topic);
  res.render(requestedTitle,{});
});


app.post("/rank",function(req,res){
  let rank_info = req.body;
  let add_rank = rank_info["rank"];
  let stage_name = rank_info["stageName"];
  console.table(stages.update(stage_name,stageList,["rank"],[add_rank]));

  res.redirect("/");

});
app.post("/addstage",function(req,res){
  let info = req.body;
  stageList = stages.Stage({
    Name: info.Name,
    Location: info.Location,
    Day: info.Day,
    startTime: info.startTime,
    rank: 0,
    rev: 0,
    Img: info.Img
  });
  CityList = stages.CityList(stageList);
  console.table(stageList);

  res.redirect("/addstage");
});
app.post("/updatestage",function(req,res){
  let info = req.body;
  let oldStageName = info.NameToUpdate;
  let field_to_update = ["Name","Location","Day","Img","startTime"];
  let new_values = [info.newName,info.newLocation,info.newDay,info.newImg,info.newstartTime];

  stageList = stages.update(oldStageName,stageList,field_to_update,new_values)
  CityList = stages.CityList(stageList);
  console.table(stageList);

  res.redirect("/updatestage");

});
app.post("/deletestage",function(req,res){
  let info = req.body;
  let stage_to_delete = info.Name;
  let entered_pass = info.Passcode;
  let ofry_pass = 2419;
  let yuval_pass = 1924;

  if(entered_pass==ofry_pass || entered_pass==yuval_pass){
    stageList = stages.delete(stage_to_delete);
    CityList = stages.CityList(stageList);
    console.table(stageList);
    res.redirect("/");
  }
  else{
    res.redirect("/deletestage");
  }
});


// listening to a dinamic port (for using heroku) and on our localhost at port 3000
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
