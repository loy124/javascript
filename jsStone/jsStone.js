const rival = {
  hero: document.querySelector('#rival-hero'),
  deck: document.querySelector('#rival-deck'),
  field: document.querySelector('#rival-cards'),
  cost: document.querySelector('#rival-cost'),
  deckData: [],
  heroData: [],
  fieldData: [],
  selectedCard: null,
  selectedCardData: null
};

const me = {
  hero: document.querySelector('#my-hero'),
  deck: document.querySelector('#my-deck'),
  field: document.querySelector('#my-cards'),
  cost: document.querySelector('#my-cost'),
  deckData: [],
  heroData: [],
  fieldData: [],
  selectedCard: null,
  selectedCardData: null
};

const turnButton = document.querySelector("#turn-button");
let turn = true; //true 면 내턴

function deckToField(data, myTurn) {
  let Object = myTurn ? me : rival;
  let costNow = Number(Object.cost.textContent);
  if (costNow < data.cost) {
    return 'end';
  }
  let idx = Object.deckData.indexOf(data);
  Object.deckData.splice(idx, 1);
  Object.fieldData.push(data);
  Object.deck.innerHTML = '';
  Object.field.innerHTML = '';
  Object.fieldData.forEach(function (data) {
    cardDomConnect(data, Object.field);
  });
  Object.deckData.forEach(function (data) {
    cardDomConnect(data, Object.deck);
  });
  data.field = true; //참조 관계
  Object.cost.textContent = costNow - data.cost;
}

function reDrawScreen(myScreen) {
  let Object = myScreen ? me : rival;
  Object.deck.innerHTML = '';
  Object.field.innerHTML = '';
  Object.hero.innerHTML = '';
  Object.fieldData.forEach(function (data) {
    cardDomConnect(data, Object.field);
  });
  Object.deckData.forEach(function (data) {
    cardDomConnect(data, Object.deck);
  });
  cardDomConnect(Object.heroData, Object.hero, true);
}

// function attack(card, data, me){
//   if (card.classList.contains('card-turnOver')) {
//     return;
//   }
//   //내카드가 선택되어있고 상대 카드면 공격 또 그게 턴이 끝난 카드가 아니라면
//   if (!data.mine && me.selectedCard) {
//     data.hp = data.hp - me.selectedCardData.att;
//     if (data.hp <= 0) { //카드가 죽었을때
//       let index = rival.fieldData.indexOf(data);
//       if (index > -1) { //쫄병이 죽었을때
//         rival.fieldData.splice(index, 1);
//       } else { //영웅이 죽었을때
//         alert("승리하셨습니다!!");
//         initializeSetting();
//       }
//     }
//     reDrawScreen(false);
//     console.log(data.hp);
//     me.selectedCard.classList.remove('card-selected');
//     me.selectedCard.classList.add('card-turnOver');
//     me.selectedCard = null;
//     me.selectedCardData = null;
//     return;
//   } else if (!data.mine) { //상대카드거나 카드가 필드에 있으면
//     return;
//   }
//   if (data.field) { // 카드가 필드에 있으면
//     card.parentNode.querySelectorAll('.card').forEach(function (card) {
//       card.classList.remove('card-selected')
//     });
//     card.classList.add('card-selected');
//     me.selectedCard = card;
//     me.selectedCardData = data;
//
//   } else {
//     //덱에있으면
//     if (deckToField(data, true) !== 'end') {
//       myDeckCreate(1);
//     }
//   }
// }

function cardDomConnect(data, dom, hero) {

  //cloneNode를 사용해서 true까지 넣으면 내부까지 복사가 가능하다
  const card = document.querySelector('.card-hidden .card').cloneNode(true);
  card.querySelector('.card-cost').textContent = data.cost;
  card.querySelector('.card-att').textContent = data.att;
  card.querySelector('.card-hp').textContent = data.hp;
  if (hero) {
    card.querySelector('.card-cost').style.display = "none";
    let name = document.createElement('div');
    name.textContent = "영웅";
    card.appendChild(name);
  }
  card.addEventListener('click', function () {
    // attack(card, data, turn);
    if (turn) {
      if (card.classList.contains('card-turnOver')) {
        return;
      }
      //내카드가 선택되어있고 상대 카드면 공격 또 그게 턴이 끝난 카드가 아니라면
      if (!data.mine && me.selectedCard) {
        data.hp = data.hp - me.selectedCardData.att;
        if (data.hp <= 0) { //카드가 죽었을때
          let index = rival.fieldData.indexOf(data);
          if (index > -1) { //쫄병이 죽었을때
            rival.fieldData.splice(index, 1);
          } else { //영웅이 죽었을때
            alert("승리하셨습니다!!");
            initializeSetting();
          }
        }
        reDrawScreen(false);
        console.log(data.hp);
        me.selectedCard.classList.remove('card-selected');
        me.selectedCard.classList.add('card-turnOver');
        me.selectedCard = null;
        me.selectedCardData = null;
        return;
      } else if (!data.mine) { //상대카드거나 카드가 필드에 있으면
        return;
      }
      if (data.field) { // 카드가 필드에 있으면
        card.parentNode.querySelectorAll('.card').forEach(function (card) {
          card.classList.remove('card-selected')
        });
        card.classList.add('card-selected');
        me.selectedCard = card;
        me.selectedCardData = data;

      } else {
        //덱에있으면
        if (deckToField(data, true) !== 'end') {
          myDeckCreate(1);
        }
      }
    } else {
      if (data.mine && rival.selectedCard) {
        data.hp = data.hp - rival.selectedCardData.att;
        if (data.hp <= 0) { //카드가 죽었을때
          let index = me.fieldData.indexOf(data);
          if (index > -1) { //쫄병이 죽었을때
            me.fieldData.splice(index, 1);
          } else { //영웅이 죽었을때
            alert("패배하셨습니다.");
            initializeSetting();
          }
        }
        reDrawScreen(true);
        console.log(data.hp);
        rival.selectedCard.classList.remove('card-selected');
        rival.selectedCard.classList.add('card-turnOver');
        rival.selectedCard = null;
        rival.selectedCardData = null;
        return;
      } else if (data.mine) { //상대카드거나 카드가 필드에 있으면
        return;
      }

      if (data.field) {
        card.parentNode.querySelectorAll('.card').forEach(function (card) {
          card.classList.remove('card-selected')
        });
        card.classList.add('card-selected');
        rival.selectedCard = card;
        rival.selectedCardData = data;
      } else {
        if (deckToField(data, false) !== 'end') {
          rivalDeckCreate(1)
        }
      }


    }
  });

  dom.appendChild(card);
}

function rivalDeckCreate(number) {
  for (let i = 0; i < number; i++) {
    rival.deckData.push(cardFactory());
  }
  rival.deck.innerHTML = '';
  rival.deckData.forEach(function (data) {

    cardDomConnect(data, rival.deck);
  })

}

function myDeckCreate(number) {
  for (let i = 0; i < number; i++) {
    me.deckData.push(cardFactory(false, true));
  }
  me.deck.innerHTML = '';
  me.deckData.forEach(function (data) {

    cardDomConnect(data, me.deck);
  })
}

function rivalHeroCreate() {
  rival.heroData = cardFactory(true);
  // card.querySelector('.card-cost').textContent = rival.heroData.cost;
  cardDomConnect(rival.heroData, rival.hero, true);
}

function myHeroCreate() {
  me.heroData = cardFactory(true, true);
  cardDomConnect(me.heroData, me.hero, true);

}


function Card(hero, myCard) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2)
  }
  if (myCard) {
    this.mine = true;
  }
}

function cardFactory(hero, myCard) {
  return new Card(hero, myCard);
}

function initializeSetting() {
  // [rival, me].forEach(function (item) {
  //   item.deckData = [];
  //   item.heroData = [];
  //   item.fieldData = [];
  //   item.selectedCard = [];
  //   item.selectedCardData = [];
  // });
  rivalDeckCreate(5);
  myDeckCreate(5);
  rivalHeroCreate();
  myHeroCreate();
  reDrawScreen(true);
  reDrawScreen(false);
}

turnButton.addEventListener('click', function () {
  let Object = turn ? me : rival;
  document.querySelector('#rival').classList.toggle('turn');
  document.querySelector('#my').classList.toggle('turn');
  Object.field.innerHTML = '';
  Object.hero.innerHTML = '';
  Object.fieldData.forEach(function (data) {
    cardDomConnect(data, Object.field);
  });
  cardDomConnect(Object.heroData, Object.hero, true);
  turn = !turn;
  if (turn) {
    me.cost.textContent = 10;
  } else {
    rival.cost.textContent = 10;
  }

});

initializeSetting();