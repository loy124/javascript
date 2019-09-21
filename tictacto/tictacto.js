const body = document.body;
const table = document.createElement("table");
const lines = [];
const blanks = [];
let turn = "X";
const win = document.createElement("h1");
body.append(win);

const onClick = function(e) {
  console.log(e.target);
  console.log(e.target.parentNode, e.target.parentNode.parentNode);
  let whatLine = lines.indexOf(e.target.parentNode);
  console.log(whatLine);
  let whatBlank = blanks[whatLine].indexOf(e.target);
  console.log(whatBlank);

  if (blanks[whatLine][whatBlank].textContent !== "") {
    //칸이 이미 채워져있는가
    console.log("이미 칸이 존재합니다 다른 칸을 클릭해주세요");
  } else {
    console.log("빈칸입니다");
    blanks[whatLine][whatBlank].textContent = turn;

    //세칸이 다 채워졌나 확인
    let full = false;
    //가로줄 검사
    if (
        blanks[whatLine][0].textContent === turn &&
        blanks[whatLine][1].textContent === turn &&
        blanks[whatLine][2].textContent === turn
    ) {
      full = true;
    }

    //세로줄 검사
    if (
        blanks[0][whatBlank].textContent === turn &&
        blanks[1][whatBlank].textContent === turn &&
        blanks[2][whatBlank].textContent === turn
    ) {
      full = true;
    }
    //대각선 검사
    if (whatLine - whatBlank === 0) {
      //대각선 검사 필요한 경우
      if (
          blanks[0][0].textContent === turn &&
          blanks[1][1].textContent === turn &&
          blanks[2][2].textContent === turn
      ) {
        full = true;
      }
    }
    if (Math.abs(whatLine - whatBlank) === 2) {
      if (
          blanks[0][2].textContent === turn &&
          blanks[1][1].textContent === turn &&
          blanks[2][0].textContent === turn
      ) {
        full = true;
      }
    }

    console.log(full);
    //다 찼으면
    if (full === true) {
      console.log(turn + "님의 승리!");

      win.textContent = turn + " 님의 승리!";
      turn = "X";
      blanks.forEach(function(line) {
        line.forEach(function(blank) {
          console.log(blank.textContent);
          blank.textContent = null;
        });
      });
    } else if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  }
};

for (let i = 1; i <= 3; i += 1) {
  let line = document.createElement("tr");
  lines.push(line);
  blanks.push([]);
  for (let j = 1; j <= 3; j += 1) {
    let blank = document.createElement("td");
    blank.addEventListener("click", onClick);
    blanks[i - 1].push(blank);
    line.appendChild(blank);
  }
  // blanks.addEventListener('cilick', onClick());
  table.appendChild(line);
}
body.appendChild(table);
console.log("lines", lines, "blanks", blanks);