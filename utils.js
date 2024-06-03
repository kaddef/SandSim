const drawGridLines = (unitSize) => {
    for (var i = 0; i < width; i += unitSize) {
        line(i, 0, i, height);
        line(width, i, 0, i);
    }
}

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};