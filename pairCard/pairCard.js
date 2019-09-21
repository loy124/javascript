let horizontal = 4;
let vertical = 3;
let colorCandidate = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow',
    'white', 'white', 'pink', 'pink'];
let color = [];
let clickFlag = true;
// while (colorCandidate.length > 0) {
//     let move = colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1)[0];
//     color.push(move);
//     console.log(move);
// }
for (let i = 0; colorCandidate.length > 0; i += 1) {
    color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
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
            if (clickFlag === true) {
                card.classList.toggle('flipped');
                console.log(clickFlag);
            }
        });
        document.body.appendChild(card);
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
    }, 5000);
}

cardSetting(horizontal, vertical);