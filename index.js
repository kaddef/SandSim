import { Sand, Stone } from "./element.js";
import gameConfig from "./config.js";
const { gameWidth, gameHeight, unitSize, canvas, ctx, board } = gameConfig;
var selectedElement = null;

canvas. addEventListener("click", function(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    
    // x = ~~(x/unitSize)*unitSize OLD VERSION
    // y = ~~(y/unitSize)*unitSize
    x = (Math.floor(x / unitSize) * unitSize)/unitSize;
    y = (Math.floor(y / unitSize) * unitSize)/unitSize;
    if(selectedElement === null)
    {
        console.log("Please select element")
        return
    }
    if(board[x][y] != 0)
    {
        console.log("Element Olan Yere Yeni Element Koyamazsin")
        return
    }
    if(selectedElement===Sand) {
        InsertElementByMatrix(x, y, "Sand")
    }
    else if(selectedElement===Stone) {
        InsertElementByMatrix(x, y, "Stone")
    }
})




document.addEventListener("keydown", function(event) {
    const key = event.code
    if(key === 'KeyT'){
        selectedElement = Sand;
        console.log("Sand Selected")
    }
    if(key === 'KeyY'){
        selectedElement = Stone;
        console.log("Stone Selected")
    }
    if(key === 'KeyU'){
        console.log("Su Gelecek")
    }
    if(key === "Space"){
        console.log("Space")
        X = Math.floor(Math.random() * ((gameWidth-unitSize)/unitSize))
        Y = Math.floor(Math.random() * ((gameHeight-unitSize)/unitSize))
    
        InsertElementByMatrix(X, Y, "Sand")
    }
    if(key === 'Enter'){
        //debugger
        console.log("Simülasyon 1 adım ilerliyor")
        //SCREEN CLEANER WAS HERE
        SimulationLoop();
    }

    if(key === 'KeyB'){
        console.log(board)
    }
})

const FloorToTen = function(number) {
    return ~~(number/10) * 10
}
const InsertElementByMatrix = function (matrixX,matrixY,elementType) {
    if(elementType==="Sand") {
        board[matrixX][matrixY] = new Sand(matrixX, matrixY, unitSize)
    }
    else if(elementType==="Stone") {
        board[matrixX][matrixY] = new Stone(matrixX, matrixY, unitSize)
    }
    board[matrixX][matrixY].draw(ctx)
}

const SimulationLoop = function()
{  
    for(var y = board[0].length - 1; y>=0; y--)
    {
        for(var x = 0; x < board.length; x++)
        {
            if(board[x][y] != 0)
            {
                //debugger
                ctx.fillStyle = "red";
                ctx.fillRect(x*unitSize,y*unitSize,unitSize,unitSize)
                board[x][y].moveIfThereIsRoom()
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var x = 0; x < board.length; x++)
    {
        
        for(var y = board[0].length - 1; y>=0; y--)
        {
            if(board[x][y] != 0)
            {
                //debugger
                board[x][y].draw(ctx)
            }
        }
    }
}