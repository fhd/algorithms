var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array.prototype.shuffle = function() {
    var s = [];
    while (this.length)
        s.push(this.splice(Math.random() * this.length, 1));
    while (s.length)
        this.push(s.pop());
    return this;
}

var Painter = (function(canvas) {
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
        $.each(array, function(index, value) {
            context.fillRect(index * 20 + 10,
                             ((array.length + 1) - value) * 10,
                             10, 10 * value);
        });
    }

    return Painter;
})();

$(function() {
    array.shuffle();
    $("#shuffle").click(function() {
        array.shuffle()
    });

    $("#sort").click(function() {
        var controls = $("#algorithms, #shuffle, #sort");
        controls.attr("disabled", "true");
        var worker = new Worker("js/worker.js");
        worker.onmessage = function(event) {
            var data = event.data;
            array = data.array;
            if (data.finished)
                controls.removeAttr("disabled");
        };
        worker.postMessage({
            script: location.pathname.substring(1) + ".js",
            "array": array
        });
    });
    Painter.init($("#canvas")[0]);
    setInterval(Painter.draw, 10);
});