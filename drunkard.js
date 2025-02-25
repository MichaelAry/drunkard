const CARDVALUES = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
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

function newGame() {
  isWin = false;
  step = 0;
  deck = fillWholeDesk();
  gameDecks[0] = crPlDecks();
  gameDecks[1] = crPlDecks();
  table = [];
  renderCurrentStep();
}

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
  gameField.innerHTML = `ходит игрок: ${(step % 2) + 1}`;
  gameField.innerHTML += `<br>1 игрок (${
    gameDecks[0].length
  } карт): ${gameDecks[0].map((el) => CARDVALUES[el - 6]).join(", ")}`;
  gameField.innerHTML += `<br>2 игрок (${
    gameDecks[1].length
  } карт): ${gameDecks[1].map((el) => CARDVALUES[el - 6]).join(", ")}`;
  gameField.innerHTML += `<br>стол: ${table.map((el) => CARDVALUES[el - 6])}`;
  gameField.innerHTML += `<br>ход: ${step}`;
}

function goFullGame() {
  while (!isWin) {
    makeStep();
  }
}

function makeStep() {
  if (isWin) return;
  let player = step % 2;
  if (gameDecks[0].length === 0) {
    isWin = true;
    alert(`игрок 2 победил, начните новую игру `);
    renderCurrentStep();
    return;
  } else if (gameDecks[1].length == 0) {
    isWin = true;
    alert(`игрок 1 победил, начните новую игру `);
    renderCurrentStep();
    return;
  }
  let card1 = gameDecks[0].shift();
  let card2 = gameDecks[1].shift();
  if (card1 > card2) {
    if ((card1 == 14 && card2 == 6) || (card1 == 13 && card2 == 7)) {
      gameDecks[1].push(card1);
      gameDecks[1].push(card2);
    } else {
      gameDecks[0].push(card1);
      gameDecks[0].push(card2);
    }
  } else if (card1 < card2) {
    if ((card1 == 6 && card2 == 14) || (card1 == 7 && card2 == 13)) {
      gameDecks[0].push(card1);
      gameDecks[0].push(card2);
    } else {
      gameDecks[1].push(card1);
      gameDecks[1].push(card2);
    }
  } else {
    while (card1 === card2) {
      table.push(card1);
      table.push(card2);
      card1 = gameDecks[0].shift();
      card2 = gameDecks[1].shift();
      if (card1 > card2) {
        if ((card1 == 14 && card2 == 6) || (card1 == 13 && card2 == 7)) {
          gameDecks[1].push(...table);
          gameDecks[1].push(card1);
          gameDecks[1].push(card2);
          table = [];
          break;
        } else {
          gameDecks[0].push(...table);
          gameDecks[0].push(card1);
          gameDecks[0].push(card2);
          table = [];
          break;
        }
      } else if (card1 < card2) {
        if ((card1 == 6 && card2 == 14) || (card1 == 7 && card2 == 13)) {
          gameDecks[0].push(...table);
          gameDecks[0].push(card1);
          gameDecks[0].push(card2);
          table = [];
          break;
        } else {
          gameDecks[1].push(...table);
          gameDecks[1].push(card1);
          gameDecks[1].push(card2);
          table = [];
          break;
        }
      }
    }
  }
  step++;
  renderCurrentStep();
}
