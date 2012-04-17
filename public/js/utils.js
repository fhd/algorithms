var utils = {
    createDrawFunction: function(canvas, drawFunction) {
        return function() {
            if (!canvas)
                return;
            drawFunction(canvas.getContext("2d"), canvas.width, canvas.height);
        };
    }
};
