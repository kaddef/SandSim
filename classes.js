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
}

class Sand {
    
}