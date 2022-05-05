
let button_names = ["one","two","three","four","five"];
let buttons = [];


// finding all the buttons with an id of a number
for(let i=0 ; i<5 ; i++){
  buttons.push(document.querySelector("#" + button_names[i]));
  buttons[i].classList.add("Ran");
}

// creating an event listener for each button
// every time the mouse is over a button the index of the button is returned
// then lighting all the lower index and turn of all the higere ones
for(let i=0; i < buttons.length ; i++){
  buttons[i].addEventListener("mouseover",function(event){
    console.log(event);
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
