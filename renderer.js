function renderCurrentStep() {
  gameField.innerHTML = `Ход игрока ${(step % 2) + 1}`;
  gameField.innerHTML += `<br>Игрок 1 ${
    gameDesks[0].length
  }: ${gameDesks[0].map((el) => SUITS[el-1])}`;
  gameField.innerHTML += `<br>Игрок 2 ${
    gameDesks[1].length
  }: ${gameDesks[1].map((el) => SUITS[el-1])}`;
}
