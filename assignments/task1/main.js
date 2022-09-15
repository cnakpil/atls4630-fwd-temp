// Light/Dark toggle
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
var currentTheme = "";
document.querySelector("body").classList.contains("dark") === true
  ? (currentTheme = "dark")
  : (currentTheme = "light");

currentTheme === "dark"
  ? (toggleSwitch.checked = true)
  : (toggleSwitch.checked = false);

toggleSwitch.addEventListener("change", () => {
  currentTheme === "dark"
    ? document.querySelector("body").classList.replace("dark", "light")
    : document.querySelector("body").classList.replace("light", "dark");

  document.querySelector("body").classList.contains("dark") === true
    ? (currentTheme = "dark")
    : (currentTheme = "light");
});

// Game Function
const ttt = {
  xTurn: true,
  xState: [],
  oState: [],

  // 2d array to hold possible win conditions
  winStates: [
    // Rows
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columns
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

document.addEventListener("click", (event) => {
  const target = event.target;
  const isCell = target.classList.contains("cell");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    const cellValue = target.dataset.value;

    ttt.xTurn === true
      ? ttt.xState.push(cellValue) // if true, push cell number to xState array
      : ttt.oState.push(cellValue); // else push cell number to oState array

    target.classList.add("disabled"); // make cell unclickable
    target.classList.add(ttt.xTurn ? "x" : "o"); // depending on true/false, add x or o

    ttt.xTurn = !ttt.xTurn; // flip turn toggle
  }

  // Check for endgame states after every click
  // Check for draws
  if (!document.querySelectorAll(".cell:not(.disabled)").length) {
    document.querySelector(".game-over").classList.add("visible");
    document.querySelector(".game-over-text").textContent = "Draw!";
  }

  // Win States
  ttt.winStates.forEach((winningState) => {
    const xWins = winningState.every((state) => ttt.xState.includes(state));
    const oWins = winningState.every((state) => ttt.oState.includes(state));

    if (xWins || oWins) {
      document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.classList.add("disabled"));
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector(".game-over-text").textContent = xWins
        ? "X wins!"
        : "O wins!";
    }
  });
});

// set reset function on button click
document.querySelector(".restart").addEventListener("click", () => {
  document.querySelector(".game-over").classList.remove("visible");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("disabled", "x", "o");
  });

  ttt.xTurn = true;
  ttt.xState = [];
  ttt.oState = [];
});
