function createDrawFunction(canvas, drawFunction) {
    return function() {
        drawFunction(canvas.getContext("2d"), canvas.width, canvas.height);
    };
}
