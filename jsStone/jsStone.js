const rivalHero = document.querySelector('#rival-hero');
const myHero = document.querySelector('#my-hero');
const rivalDeck = document.querySelector('#rival-deck');
const myDeck = document.querySelector('#my-deck');
const rivalField = document.querySelector('#rival-cards');
const myField = document.querySelector('#my-cards');
const rivalCost = document.querySelector('#rival-cost');
const myCost = document.querySelector('#my-cost');
const turnButton = document.querySelector("#turn-button");

let rivalDeckData = [];
let myDeckData = [];
let rivalHeroData;
let myHeroData;
let rivalFieldData = [];
let myFieldData = [];
let turn = true; //true 면 내턴

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
  card.addEventListener('click', function (card) {
    if (turn) {
      if (!data.mine || data.field) { //상대카드거나 카드가 필드에 있으면
        return;
      }
      let costNow = Number(myCost.textContent);
      if (costNow < data.cost) {
        return;
      }
      let idx = myDeckData.indexOf(data);
      myDeckData.splice(idx, 1);
      myFieldData.push(data);
      myDeck.innerHTML = '';
      myField.innerHTML = '';
      myFieldData.forEach(function (data) {
        cardDomConnect(data, myField);
      });
      myDeckData.forEach(function (data) {
        cardDomConnect(data, myDeck);
      });
      data.field = true; //참조 관계
      myCost.textContent = costNow - data.cost;
      myDeckCreate(1);
    } else {
      if (data.mine || data.field) {
        //상대턴인데 내카드를 누를때
        return;
      }
      let costNow = Number(rivalCost.textContent);
      if (costNow < data.cost) {
        return;
      }
      let idx = rivalDeckData.indexOf(data);
      rivalDeckData.splice(idx, 1);
      rivalFieldData.push(data);
      rivalDeck.innerHTML = '';
      rivalField.innerHTML = '';
      rivalFieldData.forEach(function (data) {
        cardDomConnect(data, rivalField);
      });
      rivalDeckData.forEach(function(data) {
        cardDomConnect(data, rivalDeck);
      });
      data.field = true;
      rivalCost.textContent = costNow - data.cost;
      rivalDeckCreate(1);
    }
  });

  dom.appendChild(card);
}

function rivalDeckCreate(number) {
  for (let i = 0; i < number; i++) {
    rivalDeckData.push(cardFactory());
  }
  rivalDeck.innerHTML ='';
  rivalDeckData.forEach(function (data) {

    cardDomConnect(data, rivalDeck);
  })

}

function myDeckCreate(number) {
  for (let i = 0; i < number; i++) {
    myDeckData.push(cardFactory(false, true));
  }
  myDeck.innerHTML = '';
  myDeckData.forEach(function (data) {

    cardDomConnect(data, myDeck);
  })
}

function rivalHeroCreate() {
  rivalHeroData = cardFactory(true);
  // card.querySelector('.card-cost').textContent = rivalHeroData.cost;
  cardDomConnect(rivalHeroData, rivalHero, true);
}

function myHeroCreate() {
  myHeroData = cardFactory(true, true);
  cardDomConnect(myHeroData, myHero, true);

}


function Card(hero, myCard) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
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
  rivalDeckCreate(5);
  myDeckCreate(5);
  rivalHeroCreate();
  myHeroCreate();
}

turnButton.addEventListener('click',function () {
  turn = !turn;
  if (turn){
    myCost.textContent = 10;
  } else{
    rivalCost.textContent = 10;
  }
  document.querySelector('#rival').classList.toggle('turn');
  document.querySelector('#my').classList.toggle('turn');
});

initializeSetting();