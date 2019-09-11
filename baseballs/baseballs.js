const strikeBall = document.querySelector(".strike");
const submit = document.querySelector(".submit");
const input = document.querySelector(".input");
const reamin = document.querySelector(".reamin");

input.maxLength = 4;
let select = [];
function selectNumber(){
  let numbers = Array(9).fill(undefined).map(function( value , index){
    return index + 1;
  });
  
  console.log(numbers);
  for(let i = 0; i<4; i++){
   let random =  numbers.splice(Math.floor(Math.random() * numbers.length - i), 1)[0];
    select.push(random);
  }
  console.log(select);
}
selectNumber();
let strike = 0;
let ball = 0;
submit.addEventListener('submit', function(e){
  e.preventDefault();
  console.log(input.value[0]);
  for(i=0; i<4; i++){
    if(select[i] === Number(input.value[i])){
      console.log("맞다");
      strike +=1;
      
      if(strike === 4){
        // selectNumber();
        strike = 0;
        ball = 0;
      }
      input.value='';
      input.focus();
    }else {
      strike = 0;
      ball = 0;
    }
  }
  console.log("스트라이크", strike, "볼", ball);
  
});