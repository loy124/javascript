let imagePick = "0";
//사전 자료 구조 
let dictionary = {
  rock: "0",
  scissor: "-142px",
  paper: "-284px"
};
//객체를 배열로 변환
//1차원 배열은 IndexOf
//2차원 배열은 find나 findIndex

function computerPick(imagePick) {
  return Object.entries(dictionary).find(function(y) {
    // console.log(y);
    return y[1] === imagePick;
  })[0];
}
let interval;
function intervalMaker() {
  clearInterval(interval);
  interval = setInterval(function() {
    if (imagePick === dictionary.rock) {
      imagePick = dictionary.scissor;
    } else if (imagePick === dictionary.scissor) {
      imagePick = dictionary.paper;
    } else {
      imagePick = dictionary.rock;
    }
    document.querySelector("#computer").style.background =
      "url('https://en.pimg.jp/023/182/267/1/23182267.jpg')" + imagePick + " 0";
  }, 100);
}
intervalMaker();
let score = {
  scissor: 1,
  rock: 0,
  paper: -1
};

document.querySelectorAll(".btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    console.log(this.textContent, computerPick(imagePick));
    clearInterval(interval);

    setTimeout(function() {
      intervalMaker();
    }, 1000);
    let myPick = this.textContent;
    let myScore = score[myPick];
    let computerScore = score[computerPick(imagePick)];
    let number = myScore - computerScore;
    let result = document.querySelector(".result");
    if (number === 0) {
      console.log("비겼습니다");
      result.textContent = "비겼습니다";
    }
    // else if ([-1, 2].includes(myScore - computerScore));
    else if (number === -1 || number === 2) {
      console.log("이겼습니다");
      result.textContent = "이겼습니다";
    }
    //배열.includes를 활용하여 ||관계를 줄일 수 있다. or 과 동일
    //else if ([-1, 2].includes(score[this.textContent] - score[computerPick(imagePick)]))
    else {
      console.log("졌습니다");
      result.textContent = "졌습니다";
    }
  });
});

// console.log(computerPick('-142px'));

// let find = Object.entries(dictionary).findIndex(function(y){
//   console.log(y);
//   return y[0] === 'paper';
// });
// console.log(find);
// let rockScissorPaper = {
//   '0' : 'rock',
//   '-142px' : 'scissor',
//   '-284px' : 'paper'
// };
// function result(imagePick, computerPick){
// if(imagePick === 'rock'){
//   imagePick = -1;
// }
// else if(imagePick === 'scissor'){
//   imagePick = 0;
// }
// else if(imagePick === 'paper'){
//   imagePick = 1;
// }
//   function pickUp(pick){
//     if(pick === 'rock'){
//       pick = -1;
//     }
//     else if (pick === 'scissor'){
//       pick = 0;
//     }
//     else if (pick === 'paper'){
//       pick = 1;
//     }
//     console.log(pick);
//   }
//   pickUp(imagePick);
//   console.log(pickUp(computerPick));
//   pickUp(computerPick);

// console.log(imagePick);
// console.log(computerPick);
//   if(imagePick - computerPick === 0){
//     return '비겼습니다';
//   }
//   else if (imagePick - computerPick === 2 || imagePick - computerPick === -1){
//     return "이겼습니다";
//   }
//   else if (imagePick - computerPick === -2 || imagePick - computerPick === 1){
//     return "졌습니다";
//   }
// }
// -1 0 1
// -1 - 0 = -1 이김
//-1 - 1 = -2  짐
// 0 + 1 = 1 짐
// 0  -1  = -1 이김
// 1 + 1 = 2 이김
// 1 - 0 = 1 짐

// document.querySelectorAll('.btn').forEach(function(btn){
//   btn.addEventListener('click', function(){
//     console.log(this.textContent, computerPick(imagePick));
//     console.log(result(this.textContent, computerPick(imagePick)));
//   });
// });

// if (this.textContent === "scissor") {
//   if (computerPick(imagePick) === "scissor") {
//     console.log("비겼습니다");
//   } else if (computerPick(imagePick) === "rock") {
//     console.log("졌습니다");
//   } else if (computerPick(imagePick) === "paper") {
//     console.log("이겼습니다");
//   }
// } else if (this.textContent === "rock") {
//   if (computerPick(imagePick) === "scissor") {
//     console.log("이겼습니다");
//   } else if (computerPick(imagePick) === "rock") {
//     console.log("비겼습니다");
//   } else if (computerPick(imagePick) === "paper") {
//     console.log("졌습니다");
//   }
// } else {
//   if (computerPick(imagePick) === "scissor") {
//     console.log("졌습니다");
//   } else if (computerPick(imagePick) === "rock") {
//     console.log("이겼습니다");
//   } else if (computerPick(imagePick) === "paper") {
//     console.log("비겼습니다");
//   }
// }
