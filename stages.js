var fs = require('fs');

const day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function round(num , dec){
  // This funtion takes a number and returns the number rounded down
  // to number of digits after the decimal point (by dec value)
  return Math.floor(num * Math.pow(10,dec)) / Math.pow(10,dec);
}


exports.Stage = function(new_stageObject){
  let stages = [];
  try{
    // read all the stages from the file
    let rawdata = fs.readFileSync('stages.json');
    stages = JSON.parse(rawdata);
  }catch(error){

  }

  // adding the new stage at the end
  if(new_stageObject.Name==undefined || new_stageObject.Name == ""){

  }else{
    stages.push(new_stageObject);
  }



  // re-writing the stages.json file
  fs.writeFile("stages.json",JSON.stringify(stages),"utf8",function(err,results){
    if(err) console.log("error" , err);
  });

  return stages;
};

function updateStage(stageName,stageList,fields_list,update_data_list){

    for(let i=0 ; i < stageList.length ; i++){
      if(stageName == stageList[i].Name){
        for(let j =0 ; j < fields_list.length ; j++){
          if(fields_list[j]=="rank"){
            stageList[i][fields_list[j]] += parseInt(update_data_list[j]);
            stageList[i]["rev"] += 1;
          }else{
            stageList[i][fields_list[j]] = update_data_list[j];
          }
        }



      }
    }

      // re-writing the stages.json file
      fs.writeFile("stages.json",JSON.stringify(stageList),"utf8",function(err,results){
        if(err) console.log("error" , err);
      });


      return stageList;

}

exports.update = updateStage;
