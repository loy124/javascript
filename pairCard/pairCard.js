let horizontal = 4;
let vertical = 3;
let colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow',
    'white', 'white', 'pink', 'pink'];
let colorCandidate = colors.slice(); //참조관계를 끊는다 1단계만 복사, 나머지는 참조
//객체및 배열 일경우 대입하면 참조관계가 되어버린다.
let color = [];
let clickFlag = true;
let clickCard = [];
let completedCard = [];
let startTime;
// while (colors.length > 0) {
//     let move = colors.splice(Math.floor(Math.random() * colors.length), 1)[0];
//     color.push(move);
//     console.log(move);
// }
function shupple() {
    for (let i = 0; colorCandidate.length > 0; i += 1) {
        color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}


function cardSetting(horizontal, vertical) {
    clickFlag = false;
    for (let i = 0; i < horizontal * vertical; i += 1) {
        let card = document.createElement('div');
        card.className = 'card';
        let cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        let cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        let cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', function () {
            if (clickFlag && !completedCard.includes(card)) {
                card.classList.toggle('flipped');
                console.log(clickFlag);
                clickCard.push(card);
                console.log(clickCard);
                if (clickCard.length === 2) {
                    console.log(clickCard[0].querySelector('.card-back').style.backgroundColor);

                    if (clickCard[0].querySelector('.card-back').style.backgroundColor ===
                        clickCard[1].querySelector('.card-back').style.backgroundColor) {
                        completedCard.push(clickCard[0]);
                        completedCard.push(clickCard[1]);
                        clickCard = [];
                        if (completedCard.length === horizontal * vertical) {
                            let endTime = new Date();
                            setTimeout(function () {
                                alert('축하합니다! 성공하셨습니다 !' + (endTime - startTime) / 1000 + ' 초');
                                document.querySelector('#wrapper').innerHTML = '';
                                // colorCandidate = colors.slice();
                                colorCandidate = JSON.parse(JSON.stringify(colors)); //2단계 3단계일 경우 사용, 성능이 안좋다
                                color = [];
                                completedCard = [];
                                startTime = null;
                                shupple();
                                cardSetting(horizontal, vertical);
                            }, 1000);

                        }
                    } else { //색이 다를경우
                        clickFlag = false;
                        setTimeout(function () {
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickFlag = true;
                            clickCard = [];
                        }, 1000);
                    }

                }
            }
        });
        document.querySelector('#wrapper').appendChild(card);
        // (function (c){
        //     card.addEventListener('click', function (c) {
        //         c.classList.toggle('flipped');
        //     })
        // })(card);
    }
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000 + 100 * index)
    });
    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card, index) {
            card.classList.remove('flipped');
        });
        clickFlag = true;
        startTime = new Date();
    }, 5000);
}

shupple();
cardSetting(horizontal, vertical);

//객체 복사
// let obj = { a: 1, b: 2, c: 3};
// let obj2 = {};
// Object.keys(obj).forEach(function(key){
//     obj2[key] = obj[key];
// });
//깊은복사
// obj = JSON.parse(JSON.stringify(obj));
// let prot = {
//     type: 'card',
//     attack: function() {},
//     defend: function () {}
// };
//
// function 카드공장(name, att, hp){
//
//     let car={
//         name: name,
//         att: att,
//         hp: hp,
//     }
//     car.__proto__ = prot; //참조
//     return car;
//
// }