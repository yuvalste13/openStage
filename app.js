const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
var $ = require("jquery");
const lodash = require("lodash");
const app = express();
var fs = require('fs');
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://admin-ofry:OfrY218790@stagecluster.8sdmq.mongodb.net/stagesDB');

function isNotEmpty(str){
  if(str == ''){
    return false;
  }
  return true;
}
const stageSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'No stage name given']
  },
  rank:{
    type: Number,
    min: 0,
    max: 5
  },
  rev: {
    type: Number
  },
  Location: {
    type: String
  },
  Img: {
    type: String
  },
  Day: String,
  startTime: {
    type: String
  },
  comments: [
    {
      Name: String,
      commentBody: String,
      Date: Date
    }
  ]


});
const Stage = mongoose.model('Stage',stageSchema);

// stageList contains all the javascript objects for the known stages
// the info comes from the stages.json file
let stageList = [];
// console.table(stageList);
let CityList = ["Ashdod","Ashkelon"];
// CityList = stages.CityList(stageList);


app.get("/",function(req,res){
  Stage.find(function(err,stages){
    if(err){
      console.log(err);
    }
    else{
      res.render("index",{CityList: CityList, StageList: stages});
    }
  });


});
app.get("/stages/:stageName",function(req,res){
  //listening for a /stages/:stageName for sending the stages info
  const requestedTitle = lodash.lowerCase(req.params.stageName);
  console.log(requestedTitle);
  Stage.find(function(err,stages){
    if(err){
      console.log(err);
      res.redirect('/');
    }
    else{
      stages.forEach(function(stage){
        if(stage.Name == requestedTitle){
            res.render("selection",{Stage: stage});
        }
      })


    }


  });

});
app.get("/rank",function(req,res){
  res.render("rank");
})
app.get("/:topic",function(req,res){
  const requestedTitle = lodash.lowerCase(req.params.topic);
  Stage.find(function(err,stages){
    if(err){
      console.log(err);
    }
    else{
      res.render(requestedTitle,{Stages: stages});
    }
  })

});


app.post("/rank",function(req,res){
  let info = req.body;
  Stage.updateOne({Name: info.stageName} , {"$inc" : {rank: info.rank , rev: 1}} , function(err){
    if(err){console.log(err);}
  })

  res.redirect("/");

});
app.post("/addstage",function(req,res){
  let info = req.body;
  let new_stage = new Stage({
    Name: info.Name,
    Location: info.Location,
    Day: info.Day,
    startTime: info.startTime,
    rank: 0,
    rev: 0,
    Img: info.Img
  });
  new_stage.save();

  res.redirect("/addstage");
});
app.post("/updatestage",function(req,res){
  let info = req.body;
  let u_stage = {};
  let oldStageName = info.NameToUpdate;
  let new_values = [info.newName,info.newLocation,info.newDay,info.newImg,info.newstartTime];

  // checking is one of the given values is empty. if it does, dont add them
  if(isNotEmpty(info.newName)){ u_stage = {...u_stage,Name:info.newName};}
  if(isNotEmpty(info.newName)){ u_stage = {...u_stage,Location:info.newLocation};}
  if(isNotEmpty(info.newDay)){ u_stage = {...u_stage,Day:info.newDay};}
  if(isNotEmpty(info.newImg)){ u_stage = {...u_stage,Img:info.newImg};}
  if(isNotEmpty(info.newstartTime)){ u_stage = {...u_stage,startTime:info.newstartTime};}

  // update the stage
  Stage.updateOne({Name: oldStageName},{"$set": u_stage},function(err){
    if(err) console.log(err);
    else console.log('Stage ' + info.NameToUpdate + ' updated');
  });

  res.redirect("/updatestage");

});
app.post("/deletestage",function(req,res){
  let info = req.body;
  let stage_to_delete = info.Name;
  let entered_pass = info.Passcode;
  let ofry_pass = 2419;
  let yuval_pass = 1924;

  // check for permission
  if(entered_pass==ofry_pass || entered_pass==yuval_pass){
    // delete the stage
    Stage.deleteOne({Name: info.Name}, function(err){
      if(err) console.log(err)
      else console.log('Stage ' + info.Name + ' deleted');
    });
    res.redirect("/deletestage");
  }
  else{
    res.redirect("/deletestage");
  }
});


// listening to a dinamic port (for using heroku) and on our localhost at port 3000
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
