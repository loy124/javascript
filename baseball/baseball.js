//숫자 야구 만들기
//룰
//자리와 숫자가 모두 맞앗을경우 스트라이크
// 숫자는 맞는데 자리위치가 다른경우 볼

const body = document.body;


let number;
let numberArray;

function vote(){
number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
numberArray = [];

for (i = 0; i < 4; i++) {
  let forList = number.splice(
    Math.floor(Math.random() * number.length - i),
    1
  )[0];
  numberArray.push(forList);
}
}
vote();

const result = document.createElement("h1");
body.append(result);
// result.textContent = "1스트라이크 1볼";
const form = document.createElement("form");
body.append(form);
const input = document.createElement("input");
form.append(input);
input.maxLength = 4;
const button = document.createElement("button");
form.append(button);
button.textContent = "입력";

const status = document.createElement("p");
body.append(status);
// status.textContent=numberArray;
let axe = 0;

let remain = 10;

form.addEventListener("submit", function(e) {
  e.preventDefault();
  let answer = input.value;
  console.log(numberArray.join(""), answer);

  if (answer === numberArray.join("")) {
    result.textContent = "홈런";
    input.value = "";
    input.focus();
    vote();
    axe = 0;
    remain = 10;
  } else {
    // status.textContent = "떙";
    let resultArray = answer.split("");
    let strike = 0;
    let ball = 0;
    // axe += 1;
    // if(axe > 11){
    //   console.log("10회가 초과하였습니다 ");
    //   status.textContent="10회가 초과하였습니다 답은" +numberArray.join('') + " 입니다";
    // }
    remain -= 1;
    if (remain > 0) {
      console.log("기회가 " + remain + " 회 남았습니다");
      status.textContent = "기회가 " + remain + " 회 남았습니다";
    } else {
      status.textContent =
        "기회가 모두 소진 되었습니다 답은 " + numberArray.join("") + "입니다";
      remain = 10;
      vote();
    }

    // for (let remain = 10; remain > 0; remain--){
    //   console.log(remain + "회 남았습니다");
    // }

    console.log("답이 틀리면", resultArray);
    for (let i = 0; i < 4; i++) {
      if (Number(resultArray[i]) === numberArray[i]) {
        console.log(Number(resultArray[i]));
        console.log("같은자리?");
        strike += 1;
      } else if (numberArray.indexOf(Number(resultArray[i])) > -1) {
        console.log("겹치는 숫자");
        ball += 1;
      }
    }
    result.textContent = strike + " 스트라이크 " + ball + " ball";
    input.value = "";
    input.focus();
    // axe = 0;
    // remain = 10;
  }
  // axe = 0;
  // remain = 10;
});
