var display = {};

(function(display) {
    var drawContent;

    function createDrawFunction(canvas, drawFunction) {
        return function() {
            if (!canvas)
                return;
            drawFunction(canvas.getContext("2d"), canvas.width, canvas.height);
        };
    }

    function draw(context, width, height) {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "12px sans";
        context.textBaseline = "top";    
        drawContent.apply(undefined, Array.prototype.slice.call(arguments));
    };

    display.init = function(drawFunction) {
        drawContent = drawFunction;
        if (typeof currentAlgorithmFile !== "undefined")
            prettyPrint();
        setInterval(createDrawFunction($("#canvas")[0], draw), 10);
    };
})(display);
