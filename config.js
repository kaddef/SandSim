const canvas = document.getElementById("simBoard");
const ctx = canvas.getContext("2d");

const gameWidth = canvas.width;
const gameHeight = canvas.height;
const unitSize = 5;

const board = Array.from(Array(gameWidth / unitSize), () =>
  new Array(gameHeight / unitSize).fill(0)
);

const gameConfig = {
  gameWidth: gameWidth,
  gameHeight: gameHeight,
  unitSize: unitSize,
  canvas: canvas,
  ctx: ctx,
  board: board,
};

export default gameConfig;