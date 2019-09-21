const body = document.body;
const table = document.createElement("table");
const lines = [];
const blanks = [];
let turn = "X";
const win = document.createElement("h1");
body.append(win);


function check(whatLine, whatBlank) {

    let full = false;
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
    //대각선 검사 필요한 경우
    if (
        blanks[0][0].textContent === turn &&
        blanks[1][1].textContent === turn &&
        blanks[2][2].textContent === turn
    ) {
        full = true;
    }

    if (
        blanks[0][2].textContent === turn &&
        blanks[1][1].textContent === turn &&
        blanks[2][0].textContent === turn
    ) {
        full = true;
    }
    console.log(full);
    //다 찼으면
    return full;
}

function initialize(draw) {
    if (draw) {
        win.textContent = "무승부";
    } else {
        win.textContent = turn + " 님의 승리!";
    }

    setTimeout(function () {
        win.textContent = '';
        blanks.forEach(function (line) {
            line.forEach(function (blank) {
                blank.textContent = '';
            });
        });
        turn = "X";
    }, 1000);

}

const onClick = function (e) {

    if (turn === 'O') {
        return;
    }
    let whatLine = lines.indexOf(e.target.parentNode);
    let whatBlank = blanks[whatLine].indexOf(e.target);
    console.log(whatLine);
    console.log(whatBlank);

    if (blanks[whatLine][whatBlank].textContent !== "") {
        //칸이 이미 채워져있는가
        console.log("이미 칸이 존재합니다 다른 칸을 클릭해주세요");
    } else {
        console.log("빈칸입니다");
        blanks[whatLine][whatBlank].textContent = turn;
        let winner = check(whatLine, whatBlank);
        //세칸이 다 채워졌나 확인
        let candidateBlank = [];
        blanks.forEach(function (line) {
            line.forEach(function (blank) {
                candidateBlank.push(blank);
                console.log(blank);
            })
        });
        candidateBlank = candidateBlank.filter(function (blank) {
            return !blank.textContent
            //빈칸중 하나를 고른다.
            //턴을 나에게 넘긴다.
        });
        if (winner === true) {
            initialize();
        } else if (candidateBlank.length === 0) { //칸이없을때
            initialize(true);
        } else {

            if (turn === "X") {
                turn = "O";
            }

            setTimeout(function () {
                console.log('컴퓨터의 턴입니다');


                let selectBlank = candidateBlank[Math.floor(Math.random() * candidateBlank.length)];
                selectBlank.textContent = turn;
                //컴퓨터가 승리했는지 체크
                let whatLine = lines.indexOf(selectBlank.parentNode);
                let whatBlank = blanks[whatLine].indexOf(selectBlank);
                let winner = check(whatLine, whatBlank);
                //세칸이 다 채워졌나 확인
                if (winner) {
                    initialize();
                }
                //턴을 나에게 넘긴다.
                turn = "X";
            }, 1000);

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
body.appendChild(table)
body.appendChild(win);

