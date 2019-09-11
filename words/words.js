let words = document.querySelector(".words");
console.log(words.textContent);

let form = document.querySelector(".submit");
let input = form.querySelector(".input");

form.addEventListener('submit', function(e){
  e.preventDefault();
  console.log(e);
  console.log(input.value);
  if(words.textContent[words.textContent.length - 1] === input.value[0]){
    words.textContent = input.value;
    input.value='';
    input.focus();
  }
  else{
    input.value='';
    input.focus();
  }

});