let dataset = [];
let tbody = document.querySelector("#table tbody");
document.querySelector("#exec").addEventListener("click", function() {
  tbody.innerHTML = "";
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

  while (numbers.length > 80) {
    let move = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    shupple.push(move);
  }
  console.log(shupple);
  // 지뢰 테이블 만들기

  for (let i = 0; i < ver; i += 1) {
    let tr = document.createElement("tr");
    var arr = [];
    dataset.push(arr);
    for (let j = 0; j < hor; j += 1) {
      arr.push("1");
      let td = document.createElement("td");
      td.addEventListener("contextmenu", function(e) {
        // 우클릭 햇을때 깃발 및 ? 표시하기
        e.preventDefault();
        console.log(e.target);
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

        console.log(parentTr, parentTbody, blank, line);
        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
          // dataset[line][blank] = '!';
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
          // dataset[line][blank] = '?';
        } else if (e.currentTarget.textContent === "?") {
          e.currentTarget.textContent = "";
          // dataset[line][blank] = 1;
          if (dataset[line][blank] === "1") {
            e.currentTarget.textContent = "";
          } else if (dataset[line][blank] === "X") {
            e.currentTarget.textContent = "X";
          }
        }
      });
      td.addEventListener("click", function(e) {
        //클릭 헀을때 주변 지뢰 개수
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        let blank = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let line = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (dataset[line][blank] === "X") {
          e.currentTarget.textContent = "펑";
        } else {
          let mineNumbers = [
            // dataset[line - 1][blank - 1],
            // dataset[line - 1][blank],
            // dataset[line - 1][blank + 1],
            dataset[line][blank - 1],
            dataset[line][blank + 1]
            // dataset[line + 1][blank - 1],
            // dataset[line + 1][blank],
            // dataset[line + 1][blank + 1]
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
          console.log(mineNumbers.length);

          e.currentTarget.textContent = mineNumbers.filter(function(y) {
            return y === "X";
          }).length;
        }
      });
      tr.appendChild(td);
      // td.textContent = 1;
    }
    tbody.appendChild(tr);
  }
  //지뢰 심기
  for (let k = 0; k < shupple.length; k++) {
    let vertical = Math.floor(shupple[k] / 10);
    let horizontal = shupple[k] % 10;
    // if (horizontal < -1){
    //   horizontal +=10;
    // }
    tbody.children[vertical].children[horizontal].textContent = "X";
    dataset[vertical][horizontal] = "X";
  }
});
