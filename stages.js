var fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stagesDB');


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
let stageList = [];



const day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function round(num , dec){
  // This funtion takes a number and returns the number rounded down
  // to number of digits after the decimal point (by dec value)
  return Math.floor(num * Math.pow(10,dec)) / Math.pow(10,dec);
}

// exports.StageList =
function saveStage(new_stage_object){

  new_stage = new Stage(new_stage_object);
  new_stage.save();


};


function show(){
  Stage.find(function(err,stages){
    if(err){
      console.log(err);
    }
    else{
      stages.forEach(function(stage){
        console.log(stage.Name);
      });
    }
  });
}

stageList = show();

exports.stageList = stageList;
