import gameConfig from "./config.js";
const { gameWidth, gameHeight, unitSize, canvas, ctx, board } = gameConfig;

function randomZeroOrOne() {
    return Math.round(Math.random());
}

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
    color = "#b07a2d"
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

    switchPlaces(newX, newY) {
        //debugger
        var temp = board[this.x][this.y];

        board[this.x][this.y] = board[newX][newY];
        board[newX][newY] = temp;

        var tempX = board[this.x][this.y].x
        var tempY = board[this.x][this.y].y

        board[this.x][this.y].x = board[newX][newY].x;
        board[this.x][this.y].y = board[newX][newY].y;
        board[newX][newY].x = tempX;
        board[newX][newY].y = tempY;
    }

    moveIfThereIsRoom() {
        //debugger
        // if(this.checkBelow()) {
        //     this.move(this.x, this.y+1)
        //     return
        // }
        // if(this.checkRightDiagonal()) {
        //     this.move(this.x+1, this.y+1)
        //     return
        // }
        // if(this.checkLeftDiagonal()) {
        //     this.move(this.x-1, this.y+1)
        //     return
        // }
        if(this.checkBelow()) {
            this.move(this.x, this.y+1)
            return
        }

        const belowBlock = board[this.x][this.y + 1];
        if (belowBlock instanceof Water) {
            //debugger
            this.switchPlaces(this.x, this.y + 1);
            this.draw();
            return;
        }
        
        if(randomZeroOrOne() === 1) {
            if(this.checkRightDiagonal()) {
                this.move(this.x+1, this.y+1)
                return
            }
            if(this.checkLeftDiagonal()) {
                this.move(this.x-1, this.y+1)
                return
            }
        }
        else {
            if(this.checkLeftDiagonal()) {
                this.move(this.x-1, this.y+1)
                return
            }
            if(this.checkRightDiagonal()) {
                this.move(this.x+1, this.y+1)
                return
            }
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

class Water {
    color = "blue"
    x;
    y;
    hasMoved = false;

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
        if(this.hasMoved) return

        // if(this.checkBelow()) {
        //     this.move(this.x, this.y+1)
        //     this.hasMoved = true;
        //     return
        // }
        // if(this.checkRightDiagonal()) {
        //     this.move(this.x+1, this.y+1)
        //     this.hasMoved = true;
        //     return
        // }
        // if(this.checkLeftDiagonal()) {
        //     this.move(this.x-1, this.y+1)
        //     this.hasMoved = true;
        //     return
        // }
        // if(this.checkRight()) {
        //     this.move(this.x+1, this.y)
        //     this.hasMoved = true;
        //     return
        // }
        // if(this.checkLeft()) {
        //     this.move(this.x-1, this.y)
        //     this.hasMoved = true;
        //     return
        // }

        if(this.checkBelow()) {
            this.move(this.x, this.y+1)
            this.hasMoved = true;
            return
        }
        if(randomZeroOrOne() === 1) {
            if(this.checkRightDiagonal()) {
                this.move(this.x+1, this.y+1)
                this.hasMoved = true;
                return
            }
            if(this.checkLeftDiagonal()) {
                this.move(this.x-1, this.y+1)
                this.hasMoved = true;
                return
            }
        }
        else {
            if(this.checkLeftDiagonal()) {
                this.move(this.x-1, this.y+1)
                this.hasMoved = true;
                return
            }
            if(this.checkRightDiagonal()) {
                this.move(this.x+1, this.y+1)
                this.hasMoved = true;
                return
            }
        }
        if(randomZeroOrOne() === 1) {
            if(this.checkRight()) {
                this.move(this.x+1, this.y)
                this.hasMoved = true;
                return
            }
            if(this.checkLeft()) {
                this.move(this.x-1, this.y)
                this.hasMoved = true;
                return
            }
        }
        else {
            if(this.checkLeft()) {
                this.move(this.x-1, this.y)
                this.hasMoved = true;
                return
            }
            if(this.checkRight()) {
                this.move(this.x+1, this.y)
                this.hasMoved = true;
                return
            }
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
    checkRight() {
        var x = this.x+1
        if(x >= gameWidth/unitSize || board[x][this.y] != 0) {
            //console.log("SAĞ BOŞ DEĞİL")
            return false
        }
        else {
            //console.log("SAĞ BOŞ")
            return true
        }
    }
    checkLeft() {
        var x = this.x-1
        if(x <=- 1 || board[x][this.y] != 0) {
            //console.log("SOL DİAGONAL BOŞ DEĞİL")
            return false
        }
        else {
            //console.log("SOL DİAGONAL BOŞ")
            return true
        }
    }
}

export {Sand, Stone, Water}