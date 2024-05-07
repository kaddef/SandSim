import gameConfig from "./config.js";
const { gameWidth, gameHeight, unitSize, canvas, ctx, board } = gameConfig;

class Stone {
    color = "black"
    x;
    y;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*unitSize,this.y*unitSize,unitSize,unitSize)
    }

    moveIfThereIsRoom() {
        return
    }
}

class Sand {
    color = "red"
    x;
    y;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*unitSize,this.y*unitSize,unitSize,unitSize)
    }
    move(newX, newY) {
        board[newX][newY] = board[this.x][this.y];
        board[this.x][this.y] = 0;
        this.x = newX;
        this.y = newY;
    }
    moveIfThereIsRoom() {
        //debugger
        if(this.checkBelow()) {
            this.move(this.x, this.y+1)
            return
        }
        if(this.checkRightDiagonal()) {
            this.move(this.x+1, this.y+1)
            return
        }
        if(this.checkLeftDiagonal()) {
            this.move(this.x-1, this.y+1)
            return
        }
    }

    checkBelow() {
        var y =  this.y+1
        if(y >= gameHeight/unitSize || board[this.x][y] != 0) {
            //console.log("ALTIM BOŞ DEĞİL")
            return false
        }
        else {
            //console.log("ALTIM BOŞ")
            return true
        }
        
    }
    checkRightDiagonal() {
        var y = this.y+1
        var x = this.x+1

        if(y >= gameHeight/unitSize || x >= gameWidth/unitSize || board[x][y] != 0) {
            //console.log("SAĞ DİAGONAL BOŞ DEĞİL")
            return false
        }
        else {
            //console.log("SAĞ DİAGONAL BOŞ")
            return true
        }
    }
    checkLeftDiagonal() {
        var y = this.y+1
        var x = this.x-1
        if(y >= gameHeight/unitSize || x <=- 1 || board[x][y] != 0) {
            //console.log("SOL DİAGONAL BOŞ DEĞİL")
            return false
        }
        else {
            //console.log("SOL DİAGONAL BOŞ")
            return true
        }
    }
}

export {Sand, Stone}