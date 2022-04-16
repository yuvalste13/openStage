


function showCard(day){
  $(".stage-day").css("visibility","hidden");
  $("div."+day).css("visibility","visible");
}
function showAll(){
  var days = ["sunday","monday","tuesday","wednesday","thursday","friday"];
  for(var i=0;i<days.length;i++){
    console.log("test");
    $("div."+ days[i]).css("visibility","visible");
  }
}

showAll();

$("button.sunday").on("click",function(event){
  showCard("sunday");
});
$("button.monday").on("click",function(event){
  showCard("monday");
});
$("button.tuesday").on("click",function(event){
  showCard("tuesday");
});
$("button.wednesday").on("click",function(event){
  showCard("wednesday");
});
$("button.thursday").on("click",function(event){
  showCard("thursday");
});
$("button.friday").on("click",function(event){
  showCard("friday");
});
