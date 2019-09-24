const rivalHero = document.querySelector('#rival-hero');
const myHero = document.querySelector('#my-hero');
const rivalDeck = document.querySelector('#rival-deck');
const myDeck = document.querySelector('#my-deck');
let rivalDeckData = [];
let myDeckData = [];
let rivalHeroData;
let myHeroData;

function rivalDeckCreate(number) {
  for (let i = 0; i < number; i++) {
    rivalDeckData.push(cardFactory());
  }
}

function myDeckCreate(number) {
  for (let i = 0; i < number; i++) {
    myDeckData.push(cardFactory());
  }
}

function rivalHeroCreate() {
  rivalHeroData = cardFactory();
}

function myHeroCreate() {
  myHeroData = cardFactory();
}

function initializeSetting() {
  rivalDeckCreate(5);
  myDeckCreate(5);
  rivalHeroCreate();
  myHeroCreate();
}

function Card() {
  this.att = Math.ceil(Math.random() * 5);
  this.hp = Math.ceil(Math.random() * 5);
  this.cost = Math.floor((this.att + this.hp) / 2)
}

function cardFactory() {
  return new Card();
}

initializeSetting();