// let numbers = Array(45);
let numbers = Array(45)
  .fill(undefined)
  .map(function(value, index) {
    // console.log(index);
    return index + 1;
  });

console.log(numbers);

let shupple = [];

//while문은 기준값이 바뀔때 자주 사용한다
while (numbers.length > 0) {
  // Math.floor(Math.random() * numbers.length)
  let move = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
  shupple.push(move);
  console.log(move);
}
console.log(shupple);
let bonus = shupple[shupple.length - 1];
//c - p 내림차순 p - c 오름차순
// 뺸 결과가 0보다 크면 순서를 바꾼다
let winningNumber = shupple.splice(0, 6).sort(function(p, c) {
  return p - c;
});
console.log(winningNumber, bonus);



// for( let i= 0; i<winningNumber.length; i++){
//   let ball = createElement('button');
//   ball.textContent=winningNumber[i];
//   result.appendChild(ball);
// }

// for ( let i = 0; i< winningNumber.length; i++){
//   setTimeout(function callback(){
//     let ball = document.createElement('div');
//   ball.textContent = winningNumber[i];
//   result.appendChild(ball);
//   }, 1000);

// }
// let result = document.getElementById('results');
let result = document.querySelector('#results');

//다른부분은 매개변수로
//겹치는 부분은 함수로
function color(number, result){
  
  let ball = document.createElement("div");
  ball.textContent = number;
  ball.style.display = "inline-block";
  ball.style.border = "1px solid black";
  ball.style.borderRadius = "100%";
  ball.style.width = "30px";
  ball.style.height = "30px";
  ball.style.textAlign = "center";
  ball.style.marginLeft="5px";
  ball.className = "ball" + number;
  ball.style.fontSize = "20px";
  let background;
  if(number <= 10) {
    background = 'red';
  } else if(number <= 20) {
    background = 'orange';
  }
  else if(number <= 30){
    background = 'yellow';
  }
  else if(number <= 40) {
    background = 'blue';
  }
  else{
    background = 'green';
  }
  ball.style.background = background;
  result.appendChild(ball);
  
}

setTimeout(function callback() {
  color(winningNumber[0], result);
}, 1000);

setTimeout(function callback() {
  color(winningNumber[1],result);
}, 2000);

setTimeout(function callback() {
  color(winningNumber[2],result);
}, 3000);

setTimeout(function callback() {
  color(winningNumber[3],result);
}, 4000);

setTimeout(function callback() {
  color(winningNumber[4],result);
}, 5000);
setTimeout(function callback() {
  color(winningNumber[5],result);
}, 6000);

setTimeout(function callback() {
  // let bonusSpace = document.getElementsByClassName("bonus")[0];
  let bonusSpace = document.querySelector(".bonus");
  color(bonus, bonusSpace);
}, 7000);

// fills.forEach(function(value,index){
//     // fills[index] = index +1;
//     console.log(value,index);
//     value = index + 1;
//     console.log(value);
// });
