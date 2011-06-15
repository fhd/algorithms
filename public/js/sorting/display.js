var array = [];
for (var i = 0; i < 30; i++)
    array[i] = i + 1;

Array.prototype.shuffle = function() {
    var s = [];
    while (this.length)
        s.push(this.splice(Math.random() * this.length, 1));
    while (s.length)
        this.push(s.pop());
    return this;
};

var Painter = (function () {
    var Painter = {}, width, height, context;

    Painter.init = function(canvas) {
        width = canvas.width;
        height = canvas.height;
        context = canvas.getContext("2d");
    };

    Painter.draw = function() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "12px sans";
        context.textBaseline = "top";
        var barWidth = 5;
        $.each(array, function(index, value) {
            context.fillRect(index * barWidth * 2 + barWidth,
                             ((array.length + 1) - value) * barWidth,
                             barWidth, barWidth * value);
        });
    };

    return Painter;
})();

var sorting = (function() {
    return {
        init: function(stack) {
            if (typeof currentAlgorithmFile != "undefined") {
                prettyPrint(); // Prettify

                array.shuffle();
                $("#shuffle").click(function() {
                    array.shuffle();
                });

                $("#sort").click(function() {
                    var controls = $("#algorithms, #shuffle, #sort");
                    controls.attr("disabled", "true");
                    var worker = new Worker("js/sorting/worker.js");
                    worker.onmessage = function(event) {
                        var data = event.data;
                        array = data.array;
                        if (data.finished)
                            controls.removeAttr("disabled");
                    };
                    worker.postMessage({
                        file: currentAlgorithmFile,
                        functionName: currentAlgorithmFunction,
                        "array": array
                    });
                });

                Painter.init($("#canvas")[0]);
                setInterval(Painter.draw, 10);
            }
        }
    };
})();
