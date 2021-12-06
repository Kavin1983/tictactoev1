const boxes = Array.from(document.querySelectorAll(".board__box"));
const settingsBar = document.querySelector(".settingsbar");
const turnText = document.querySelector(".turn");
const oScoreEl = document.querySelector(".o-score");
const xScoreEl = document.querySelector(".x-score");
const btnReset = document.querySelector(".reset");
const winningMessageEl = document.querySelector(".winning-message");

let boxesSelected = [];
let currentPlayer = "X";
let winner = false;
let xChecked = [];
let oChecked = [];
let xScore = 0;
let oScore = 0;

const toggleMessage = function (message) {
  winningMessageEl.textContent = message;
  winningMessageEl.classList.toggle("none");
};

btnReset.addEventListener("click", () => {
  winner = false;
  xChecked = [];
  oChecked = [];
  boxesSelected = [];
  toggleMessage("");
  btnReset.classList.add("down");
  btnReset.classList.add("none");
  boxes.forEach((box) => {
    box.classList.remove("green");
    box.innerHTML = "";
  });
});

const handleScore = function () {
  if (currentPlayer === "X") {
    xScore++;
  } else {
    oScore++;
  }

  xScoreEl.textContent = `x: ${xScore}`;
  oScoreEl.textContent = `o: ${oScore}`;
};

const switchPlayer = function () {
  if (currentPlayer === "X") {
    currentPlayer = "O";
    turnText.textContent = "Turn: O";
  } else {
    currentPlayer = "X";
    turnText.textContent = "Turn: X";
  }
};

const renderBoxCheck = function (boxElement) {
  boxElement.innerHTML = `<span class="board__check">${currentPlayer}</span>`;
};

const renderWin = function () {
  toggleMessage(`${currentPlayer} Won!`);
  handleScore();
  btnReset.classList.remove("none");
  btnReset.classList.remove("down");
};

const checkWin = function () {
  const winningCombos = [
    ["0", "1", "2"],
    ["0", "4", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["2", "4", "6"],
    ["3", "4", "5"],
    ["6", "7", "8"],
  ];
  const playersNumsChecked = [xChecked, oChecked];
  winningCombos.forEach((combo) => {
    const [num1, num2, num3] = combo;
    playersNumsChecked.forEach((player) => {
      if (
        player.includes(num1) &&
        player.includes(num2) &&
        player.includes(num3)
      ) {
        [
          document.querySelector(`[data-box-num='${num1}']`),
          document.querySelector(`[data-box-num='${num2}']`),
          document.querySelector(`[data-box-num='${num3}']`),
        ].forEach((num) => {
          num.classList.add("green");
        });
        winner = true;

        document.querySelector(`[data-box-num='${num2}']`);
        document.querySelector(`[data-box-num='${num3}']`);
        renderWin();
      }
    });
  });
};

const checkDraw = function () {
  if (boxes.every((box) => box.firstChild)) {
    console.log("draw");
    toggleMessage("Draw");
    btnReset.classList.remove("none");
    btnReset.classList.remove("down");
  }
};

const handleBoxClick = function (e) {
  const boxNum = e.target.dataset.boxNum;

  if (!boxesSelected.includes(boxNum) && !winner) {
    boxesSelected.push(boxNum);

    if (currentPlayer === "X") {
      xChecked.push(e.target.dataset.boxNum);
    }
    if (currentPlayer === "O") {
      oChecked.push(e.target.dataset.boxNum);
    }

    renderBoxCheck(e.target);
    checkWin();
    checkDraw();
    switchPlayer();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    handleBoxClick(e);
  });
});
