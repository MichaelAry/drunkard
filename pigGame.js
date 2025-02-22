// let deck = [1, 1, 1, 1, 1, 1, 1, 1, 1];
const SUITS = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const N = 36;
let step = 0;
let desk = Array.from({ length: N }, (item, index) => {
  return 1 + (index % 9);
});
desk.sort((a, b) => a - b);
let isWin = false;
// console.log(desk);

let gameDesks = [[], []]; // Desks of players

for (let i = 0; i < N / 2; i++) {
  let jjj = Math.floor(Math.random() * (desk.length - 1));
  gameDesks[0].push(desk[jjj]);
  desk.splice(jjj, 1);
}
// gameDesks[1] = desk;
gameDesks[1] = [...desk]; // Поэлементное копирование
// gameDesks[1] = Array.from(desk);
// gameDesks[1] = desk.slice(0, N/2);

// console.log(desk);
renderCurrentStep();

function playAllGame() {
  while (gameDesks[0].length > 8 && gameDesks[1].length > 8) {
    makeStep();
  }
  gameField += isWin = true;
}

function makeStep() {
  if (isWin) return;
  let player = step % 2;
  let card1 = gameDesks[0].shift();
  let card2 = gameDesks[1].shift();

  if (card1 > card2) {
    gameDesks[0].push(card1);
    gameDesks[0].push(card2);
  } else if (card1 < card2) {
    gameDesks[1].push(card1);
    gameDesks[1].push(card2);
  } else if (card1 == 1 && card2 == 9) {
    gameDesks[0].push(card1);
  } else if (card1 == 9 && card2 == 1) {
    gameDesks[1].push(card2);
  } else {
    gameDesks[0].push(card1);
    gameDesks[1].push(card2);
  }

  step++;
  if (gameDesks[0].length === 0 || gameDesks[1].length === 0) isWin = true;

  renderCurrentStep();
}
