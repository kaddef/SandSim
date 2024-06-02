const canvas = document.getElementById("simBoard");
const ctx = canvas.getContext("2d");
let gameWidth = 500;
let gameHeight = 500;
let unitSize = 50;
ctx.canvas.width = gameWidth;
ctx.canvas.height = gameHeight;

canvas. addEventListener("click", function(event) {
    x = (Math.floor(event.offsetX / unitSize) * unitSize)/unitSize;
    y = (Math.floor(event.offsetY / unitSize) * unitSize)/unitSize;
    console.log(x)
    console.log(y)
    SimBoard.set(x,y,Sand)
    SimBoard.simulationLoop();
})

document.addEventListener("keydown", function(event) {
    const key = event.code

    if(key === 'KeyB'){
        console.table(SimBoard.matrix)
    }

    if(key === 'Enter'){
        console.log("Simülasyon 1 adım ilerliyor")
    }
})

class Grid {
    //This width and height differ from the canvas width and height.
    initialize(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = Array.from(Array(width), () =>
            new Array(height).fill(0)
        );
    }

    clear() {
        this.matrix = Array.from(Array(this.width), () =>
            new Array(this.height).fill(0)
        );
    }

    set(x,y,Object) {
        this.matrix[y][x] = new Object(x,y);
    }

    swap(x1,y1,x2,y2) {
        let temp = this.matrix[y1][x1]
        this.matrix[y1][x1] = this.matrix[y2][x2]
        this.matrix[y2][x2] = temp
    }

    async simulationLoop() {
        // columnOffset is X
        for(var y = this.matrix[0].length - 1; y>=0; y--)
        {
            const leftToRight = Math.random() > 0.5;
            for(var x = 0; x < this.matrix.length; x++)
            {
                const columnOffset = leftToRight ? x : -x - 1 + this.width;
                // await delay(100).then(()=>{
                //     ctx.fillStyle = "red";
                //     ctx.fillRect(columnOffset*unitSize,y*unitSize,unitSize,unitSize)
                // })
                if(this.matrix[columnOffset][y] != 0)
                {
                    //DO THINGS
                }
            }
        }
    }
}

class Sand {
    color = "rgb(194, 178, 128)";

    draw(x,y) {
        ctx.fillStyle = this.color;
        ctx.fillRect(y*unitSize,x*unitSize,unitSize,unitSize)
    }
}

function delay(time) {//For debugging
    return new Promise(resolve => setTimeout(resolve, time));
}

const SimBoard = new Grid()
SimBoard.initialize(gameWidth/unitSize,gameHeight/unitSize)
