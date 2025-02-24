const suits = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const N = 36;
let step = 0;
let table = [];
let isWin = false;
let deck = fillWholeDesk();
let gameDecks = [[], []];
gameDecks[0] = crPlDecks();
gameDecks[1] = crPlDecks();

console.log(gameDecks[0]);
console.log(gameDecks[1]);

renderCurrentStep();

function fillWholeDesk() {
  let temp = Array.from({ length: N }, (item, index) => {
    return 6 + (index % 9);
  });

  temp.sort((a, b) => a - b);
  return temp;
}

function crPlDecks() {
  let tempArr = [];
  for (let i = 0; i < N / 2; i++) {
    let indOfCard = Math.floor(Math.random() * (deck.length - 1));
    tempArr.push(deck[indOfCard]);
    deck.splice(indOfCard, 1);
  }
  return tempArr;
}

function renderCurrentStep() {
  gameField.innerHTML = `Ход игрока: ${(step % 2) + 1}`;
  gameField.innerHTML += `<br>1 Игрок (${
    gameDecks[0].length
  } карт на руках): ${gameDecks[0].map((el) => suits[el - 6]).join(", ")}`;
  gameField.innerHTML += `<br>2 Игрок (${
    gameDecks[1].length
  } карт на руках): ${gameDecks[1].map((el) => suits[el - 6]).join(", ")}`;
  gameField.innerHTML += `<br>Стол: ${table.map((el) => suits[el - 6])}`;
  gameField.innerHTML += `<br>Ход номер: ${step}`;
}

function playAllGame() {
  while (gameDecks[0].length > 0 && gameDecks[1].length > 0) {
    makeStep();
  }
  isWin = true;
}

function makeStep() {
  if (isWin) return;
  let player = step % 2;
  if (gameDecks[player].length === 0) {
    isWin = true;
    console.log(`Игрок ${player + 1} выиграл!`);
    renderCurrentStep();
    return;
  }
  let card1 = gameDecks[0].shift();
  let card2 = gameDecks[1].shift();
  if (card1 > card2) {
    if (card1 === 14 && card2 === 6 /* || (card1 === 13 && card2 === 7)*/) {
      gameDecks[1].push(card1);
      gameDecks[1].push(card2);
    } else {
      gameDecks[0].push(card1);
      gameDecks[0].push(card2);
    }
  } else if (card1 < card2) {
    if (card1 === 6 && card2 === 14 /* || (card1 === 7 && card2 === 13)*/) {
      gameDecks[0].push(card1);
      gameDecks[0].push(card2);
    } else {
      gameDecks[1].push(card1);
      gameDecks[1].push(card2);
    }
  } else {
    table.push(card1);
    table.push(card2);
  }
  if (gameDecks[0].length === 0 || gameDecks[1].length === 0) {
    if (gameDecks[0].length === 0) gameDecks[0] = table;
    else gameDecks[1] = table;
    table = [];
  }
  step++;

  renderCurrentStep();
}
