let dataset = [];
let tbody = document.querySelector("#table tbody");
let stopFlag = false;
let openBlank = 0;
let code = {
  openedBlank: -1,
  question: -2,
  flag: -3,
  flagMine: -4,
  questionMine: -5,
  mine: 1,
  normal: 0
};
document.querySelector("#exec").addEventListener("click", function() {
  tbody.innerHTML = ""; //중복해서 늘어나는것을 방지하는 코드
  dataset = [];
  openBlank = 0;
  stopFlag = false;

  document.querySelector("#result").textContent = "";
  let ver = parseInt(document.querySelector("#ver").value);
  let hor = parseInt(document.querySelector("#hor").value);
  let mine = parseInt(document.querySelector("#mine").value);

  //데이터와 화면을 따로 생각하되 둘을 일치시키는 작업을 할것

  //피셔 예이츠 셔플로 지뢰 위치 20개를 뽑는다
  let numbers = Array(hor * ver)
    .fill(undefined)
    .map(function(value, index) {
      return index;
    });
  // console.log(numbers);
  let shupple = [];

  while (numbers.length > hor * ver - mine) {
    let move = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    shupple.push(move);
  }

  // 지뢰 테이블 만들기

  for (let i = 0; i < ver; i += 1) {
    let tr = document.createElement("tr");
    var arr = [];
    dataset.push(arr);
    for (let j = 0; j < hor; j += 1) {
      arr.push(code.normal);
      let td = document.createElement("td");
      td.addEventListener("contextmenu", function(e) {
        // 우클릭 햇을때 깃발 및 ? 표시하기
        e.preventDefault();
        if (stopFlag === true) {
          return;
        }

        // e.currentTarget 이벤트 리스너가 달린 상태가 currentTarget
        // e.target 실제 타겟이 발생한곳이 target
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        //indexOf를 사용하고 싶은데 배열이 아닐 경우
        // 강제로 적용하게 하는 방법
        // let blank = Array.prototype.indexOf.call(parentTr.children, td);
        let blank = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
          e.currentTarget.classList.add('flag');
          // dataset[line][blank] = '!';
          if (dataset[line][blank] === code.mine) {
            dataset[line][blank] = code.flagMine;
          } else {
            dataset[line][blank] = code.flag;
          }
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
          e.currentTarget.classList.remove('flag');
          e.currentTarget.classList.add('question');
          // dataset[line][blank] = '?';
          if (dataset[line][blank] === code.flagMine) {
            dataset[line][blank] = code.questionMine;
          } else {
            dataset[line][blank] = code.question;
          }
        } else if (e.currentTarget.textContent === "?") {
          e.currentTarget.classList.remove('question');
      
          // dataset[line][blank] = 1;
          if (dataset[line][blank] === code.questionMine) {
            e.currentTarget.textContent = "X";
            dataset[line][blank] = code.mine;
          } else {
            e.currentTarget.textContent = "";
            dataset[line][blank] = code.normal;
          }
        }
      });
      td.addEventListener("click", function(e) {
        //클릭 헀을때 주변 지뢰 개수
        //중단시키는 if문
        if (stopFlag === true) {
          return;
        }
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        let blank = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

        if (
          [
            code.openedBlank,
            code.flag,
            code.flagMine,
            code.questionMine,
            code.question
          ].includes(dataset[line][blank])
        ) {
          return;
        }
        e.currentTarget.classList.add("opened"); // 중복 클래스 추가
        openBlank += 1;
        if (dataset[line][blank] === code.mine) {
          e.currentTarget.textContent = "펑";
          document.querySelector("#result").textContent = "실패ㅠㅠ";
          stopFlag = true;
        } else {
          let mineNumbers = [
            dataset[line][blank - 1],
            dataset[line][blank + 1]
          ];
          if (dataset[line - 1]) {
            mineNumbers = mineNumbers.concat([
              dataset[line - 1][blank - 1],
              dataset[line - 1][blank],
              dataset[line - 1][blank + 1]
            ]);
          }
          if (dataset[line + 1]) {
            mineNumbers = mineNumbers.concat([
              dataset[line + 1][blank - 1],
              dataset[line + 1][blank],
              dataset[line + 1][blank + 1]
            ]);
          }

          let sideMineNumbers = mineNumbers.filter(function(y) {
            return [code.mine, code.flagMine, code.questionMine].includes(y);
          }).length;
          // '' 0 NAN null undefined false 등이 나오면 || ""를 대신써라
          e.currentTarget.textContent = sideMineNumbers || "";
          dataset[line][blank] = code.openedBlank;
          if (sideMineNumbers === 0) {
            //주변 8칸 동시 오픈

            let side = [];

            if (tbody.children[line - 1]) {
              side = side.concat([
                tbody.children[line - 1].children[blank - 1],
                tbody.children[line - 1].children[blank],
                tbody.children[line - 1].children[blank + 1]
              ]);
            }
            side = side.concat([
              tbody.children[line].children[blank - 1],
              tbody.children[line].children[blank + 1]
            ]);
            if (tbody.children[line + 1]) {
              side = side.concat([
                tbody.children[line + 1].children[blank - 1],
                tbody.children[line + 1].children[blank],
                tbody.children[line + 1].children[blank + 1]
              ]);
            }

            side
              .filter(v => !!v)
              .forEach(function(side) {
                console.log(side);
                let parentTr = side.parentNode;
                let parentTbody = side.parentNode.parentNode;
                let sideBlank = Array.prototype.indexOf.call(
                  parentTr.children,
                  side
                );
                let sideLine = Array.prototype.indexOf.call(
                  parentTbody.children,
                  parentTr
                );
                if (dataset[sideLine][sideBlank] !== code.openedBlank) {
                  side.click();
                }
              }); //빈문자열 및 null undefined등을 제거
          }
        }
        console.log(openBlank, hor * ver - mine);
        if (openBlank === hor * ver - mine) {
          stopFlag = true;
          document.querySelector("#result").textContent = "승리!!!";
        }
      });
      tr.appendChild(td);
      // td.textContent = 1;
    }
    tbody.appendChild(tr);
  }
  //지뢰 심기
  for (let k = 0; k < shupple.length; k++) {
    let vertical = Math.floor(shupple[k] / ver);
    let horizontal = shupple[k] % ver;
    // if (horizontal < -1){
    //   horizontal +=10;
    // }
    console.log(tbody.children[vertical]);
    tbody.children[vertical].children[horizontal].textContent = "X";
    dataset[vertical][horizontal] = code.mine;
  }
});

function recall(number) {
  if (number < 5) {
    recall(number + 1);
  }
}
// let name = 'zero';

//코드가 쓰여진순간부터 정해져있다.
// function log (){
//   console.log(name);
// }
// function wrapper(){
//   name = 'nero';
//   log();
// }
// wrapper();
// for (var i = 0; i < 100; i++) {
//   // console.log(i);
//   // //비동기의 순서
//   setTimeout(function(){
//     console.log(i);
//   }, i * 100);
//   // console.log(i);
//   //클로져 해결방법
//   function closure(j){ //j는 무조건 20번쨰 줄의 j이므로 모두 적용된다
//     setTimeout(function(){
//       console.log(j);
//     }, j * 100);
//   }
//   closure(i);
// }
