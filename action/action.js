// console.time('시간');
//console.time은 디버깅용
// let startTime = performance.now();//performance 는 정밀한 시간

let screen = document.querySelector("#screen");
let start;
let endTime;
let timeList = [];
let timeOut;
screen.addEventListener("click", function () {
    // let endTime = performance.now();
    // console.timeEnd('시간')
    if (screen.classList.contains("waiting")) { //현재 준비상태인지 파악
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요';

        timeOut = setTimeout(function () {
            start = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000);
    } else if (screen.classList.contains("ready")) { //현재 준비상태인지 파악
        if (!start) { //부정 클릭
            clearTimeout(timeOut);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = '너무 성급하시군요!';
        } else{
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = '클릭하세요';
        }


    } else if (screen.classList.contains("now")) { //현재 준비상태인지 파악
        endTime = new Date();
        console.log("반응속도", endTime - start, "ms");
        timeList.push(endTime - start);
        start = null;
        endTime = null;
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요';
    }
    // function a() {
    //     setTimeout(function() {
    //         a();
    //     }, 0);
    // }
    // a();
});
