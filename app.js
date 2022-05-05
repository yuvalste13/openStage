const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
var $ = require("jquery");
const lodash = require("lodash");
const app = express();
const stagesDB = require(__dirname + '/stages.js');
// const geocoder = require(__dirname + '/geocoder.js');
var fs = require('fs');
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}));
const mongoose = require('mongoose');
mongoose.connect(stagesDB.stages);
function isNotEmpty(str) {
  if (str == '') {
    return false;
  }
  return true;
}

const stageSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'No stage name given']
  },
  rank: {
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
  Coord:{
    Lon: Number,
    Lat: Number
  },
  Address: {
    City: {
      type: String,
      required: [true, 'No city given']
    },
    Street: {
      type: String,
      required: [true, 'No street given']
    },
    Number: {
      type: String,
      required: [true, 'No street number given']
    },
  },
  Phone: String,
  Img: {
    type: String
  },
  Day: String,
  Description: String,
  startTime: {
    type: String
  },
  Comments: [{
    Name: String,
    commentBody: String,
    Date: Date
  }]



});
const Stage = mongoose.model('Stage', stageSchema);
let CityList = ["Ashdod", "Ashkelon"];

app.get("/", function(req, res) {
  const title = 'Home';
  Stage.find(function(err, stages) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        CityList: CityList,
        StageList: stages, Title: title
      });
    }

  });
});
app.get("/stages/:stageName",function(req,res){

  const requestedTitle = lodash.lowerCase(req.params.stageName);
  let coord;
  let weaterData;
  let query;
  const apiKey = stagesDB.weaterAPI;
  const units = "metric";





  Stage.find(function(err,stages){
    if(err){console.log(err);
    }
    else{
      stages.forEach(function(stage){
        if (lodash.lowerCase(stage.Name) == requestedTitle){
          const title = stage.Name;
          res.render("selection",{Stage: stage, Title: title});
        }
      })
    }
  });

});
app.get("/rank", function(req, res) {
  res.render("rank",{Title: 'Rank'});
})
app.get("/:topic", function(req, res) {
  const requestedTitle = lodash.lowerCase(req.params.topic);
  const title = requestedTitle;
  Stage.find(function(err, stages) {
    if (err) {
      console.log(err);
    } else {
      res.render(requestedTitle, {
        Stages: stages, Title: title
      });
    }
  })

});

app.post("/rank", function(req, res) {
  let info = req.body;
  Stage.updateOne({
    Name: info.stageName
  }, {
    "$inc": {
      rank: info.rank,
      rev: 1
    }
  }, function(err) {
    if (err) {
      console.log(err);
    }
  })

  res.redirect("/");

});
app.post("/addstage", function(req, res) {
  let info = req.body;
  let coord;
  let weaterData;
  let query;
  const apiKey = stagesDB.weaterAPI;
  const units = "metric";
  query = info.City + ',' + info.Street + ' ' + info.Number;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url,function(response){
    response.on("data",function(data){
      weaterData = JSON.parse(data);
      coord = weaterData.coord;
      let new_stage = new Stage({
        Name: info.Name,
        Location: info.City,
        Address: {
          City: info.City,
          Street: info.Street,
          Number: info.Number
        },
        Day: info.Day,
        startTime: info.startTime,
        rank: 0,
        rev: 0,
        Img: info.Img,
        Phone: info.Phone,
        Coord:{
          Lon: coord.lon,
          Lat: coord.lat
        }
      });
      new_stage.save();
    })
  });
  res.redirect("/addstage");

});
app.post("/updatestage", function(req, res) {
  let info = req.body;
  let u_stage = {};
  let oldStageName = info.NameToUpdate;
  // let new_values = [info.newName,info.newCity,info.newStreet,info.newNumber, info.newDay, info.newImg, info.newstartTime,info.newPhone,info.newLat,info.newLon];

  // checking is one of the given values is empty. if it does, dont add them
  if (isNotEmpty(info.newName)) {
    u_stage = {
      ...u_stage,
      Name: info.newName
    };
  }
  if (isNotEmpty(info.newCity) && isNotEmpty(info.newStreet) && isNotEmpty(info.newNumber)) {
    u_stage = {
      ...u_stage,
      Location: info.newLocation,
      Address: {
        City: info.newCity,
        Street: info.newStreet,
        Number: info.newNumber
      }
    };
  }
  if (isNotEmpty(info.newDay)) {
    u_stage = {
      ...u_stage,
      Day: info.newDay
    };
  }
  if (isNotEmpty(info.newImg)) {
    u_stage = {
      ...u_stage,
      Img: info.newImg
    };
  }
  if (isNotEmpty(info.newstartTime)) {
    u_stage = {
      ...u_stage,
      startTime: info.newstartTime
    };
  }
  if(isNotEmpty(info.newPhone)){
    u_stage = {
      ...u_stage,
      Phone: info.newPhone
    }
  }
  if(isNotEmpty(info.newLat) && isNotEmpty(info.newLon)){
    u_stage = {
      ...u_stage,
      Coord:{
        Lat: Number(info.newLat),
        Lon: Number(info.newLon)
      }
    }
  }

  // update the stage
  Stage.updateOne({
    Name: oldStageName
  }, {
    "$set": u_stage
  }, function(err) {
    if (err) console.log(err);
    else console.log('Stage ' + info.NameToUpdate + ' updated');
    console.log(u_stage);
  });

  res.redirect("/updatestage");

});
app.post("/deletestage", function(req, res) {
  let info = req.body;
  let stage_to_delete = info.Name;
  let entered_pass = info.Passcode;
  let ofry_pass = 2419;
  let yuval_pass = 1924;

  // check for permission
  if (entered_pass == ofry_pass || entered_pass == yuval_pass) {
    // delete the stage
    Stage.deleteOne({
      Name: info.Name
    }, function(err) {
      if (err) console.log(err)
      else console.log('Stage ' + info.Name + ' deleted');
    });
    res.redirect("/deletestage");
  } else {
    res.redirect("/deletestage");
  }
});
app.post("/comment",function(req,res){
  let info = req.body;

});

// listening to a dinamic port (for using heroku) and on our localhost at port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
