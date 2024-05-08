import { Sand, Stone, Water } from "./element.js";
import gameConfig from "./config.js";
const { gameWidth, gameHeight, unitSize, canvas, ctx, board } = gameConfig;
var selectedElement = null;
var spawnSize = 0;

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
    // if(board[x][y] != 0)
    // {
    //     console.log("Element Olan Yere Yeni Element Koyamazsin")
    //     return
    // }
    if(selectedElement===Sand) {
        InsertElementByMatrix(x, y, spawnSize, "Sand")
    }
    else if(selectedElement===Stone) {
        InsertElementByMatrix(x, y, spawnSize, "Stone")
    }
    else if(selectedElement===Water) {
        InsertElementByMatrix(x, y, spawnSize, "Water")
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
        selectedElement = Water;
        console.log("Water Selected")
    }
    if(key === 'KeyG'){
        spawnSize = 0;
        console.log("Spawn Size is 0")
    }
    if(key === 'KeyH'){
        spawnSize = 3;
        console.log("Spawn Size is 3")
    }
    if(key === 'KeyJ'){
        spawnSize = 5;
        console.log("Spawn Size is 5")
    }
    if(key === "KeyR"){
        console.log("Redrawing")
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var x = 0; x < board.length; x++)
        {
            
            for(var y = board[0].length - 1; y>=0; y--)
            {
                if(board[x][y] != 0)
                {
                    //debugger
                    board[x][y].draw(ctx)
                    board[x][y].hasMoved = false;
                }
            }
        }
    }
    if(key === "Space"){
        console.log("Space")
        let X = Math.floor(Math.random() * ((gameWidth-unitSize)/unitSize))
        let Y = Math.floor(Math.random() * ((gameHeight-unitSize)/unitSize))
    
        InsertElementByMatrix(X, Y, 1, "Sand")
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

const InsertElementByMatrix = function (matrixX,matrixY,spawnSize,elementType) {
    //console.log(`MiddlePoint: Y:${matrixY}/X:${matrixX}`)
    for(var y = matrixY-spawnSize; y<= matrixY+spawnSize; y++)
    {
        for(var x = matrixX-spawnSize; x<= matrixX+spawnSize; x++)
        {
            //console.log(`Y:${y}/X:${x}`);
            if(elementType==="Sand") {
                board[x][y] = new Sand(x, y, unitSize)
            }
            else if(elementType==="Stone") {
                board[x][y] = new Stone(x, y, unitSize)
            }
            else if(elementType==="Water") {
                board[x][y] = new Water(x, y, unitSize)
            }
            board[x][y].draw(ctx)
        }
    }

    // if(elementType==="Sand") {
    //     board[matrixX][matrixY] = new Sand(matrixX, matrixY, unitSize)
    // }
    // else if(elementType==="Stone") {
    //     board[matrixX][matrixY] = new Stone(matrixX, matrixY, unitSize)
    // }
    // else if(elementType==="Water") {
    //     board[matrixX][matrixY] = new Water(matrixX, matrixY, unitSize)
    // }
    // board[matrixX][matrixY].draw(ctx)
    
}
// I can probably make this in one for loop
const SimulationLoop = function()
{  
    for(var y = board[0].length - 1; y>=0; y--)
    {
        for(var x = 0; x < board.length; x++)
        {
            if(board[x][y] != 0)
            {
                //debugger
                // ctx.fillStyle = "red";
                // ctx.fillRect(x*unitSize,y*unitSize,unitSize,unitSize)
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
                board[x][y].hasMoved = false;
            }
        }
    }
}