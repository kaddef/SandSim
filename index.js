let gameWidth = 500;
let gameHeight = 500;
let unitSize = 50;
const SimBoard = new Grid();

function setup() {
    createCanvas(gameWidth, gameHeight);
    frameRate(60);
    //noLoop();
    SimBoard.initialize(gameWidth/unitSize,gameHeight/unitSize)
}

function keyPressed() {
    if(keyCode === ENTER){
        redraw();
    }
    if(keyCode === 66){//Aka B
        console.table(SimBoard.matrix)
    }
}
  
function draw() {
    background("#232b2b");
    drawGridLines(unitSize)
}