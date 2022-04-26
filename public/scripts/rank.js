
let button_names = ["one","two","three","four","five"];
let buttons = [];

// buttons = (document.querySelector("i.star"))
for(let i=0 ; i<5 ; i++){
  buttons.push(document.querySelector("#" + button_names[i]));

}


for(let i=0; i < buttons.length ; i++){
  buttons[i].addEventListener("mouseover",function(event){
    for(let j=0; j <= buttons.length ; j++){
      if(j<=i){
        buttons[j].classList.add("light");
      }
      else{
        buttons[j].classList.remove("light");
      }

    }


  });
}
