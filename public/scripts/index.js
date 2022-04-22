




function showCard(day){
  $(".stage-day").css("display","none");
  $("div."+ day).css("display","inline");
}


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
