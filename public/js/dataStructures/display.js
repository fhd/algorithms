var array = [],
    Painter = (function () {
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
            var boxSize = 20,
            padding = 5,
            textPadding = 5,
            pos = 0;
            $.each(array, function(index, value) {
                boxWidth = boxSize * new String(value).length;
                context.strokeRect(pos + padding, padding, boxWidth, boxSize);
                context.fillText(value, pos + padding + textPadding,
                                 padding + textPadding);
                pos += boxWidth;
            });
        };

        return Painter;
    })();

function stackToArray(stack) {
    if (!stack || stack.stackEmpty())
        return [];

    var array = [];
    for (var e, i = 0; e = stack.pop();)
        array[i++] = e;
    for (var i = array.length - 1; i >= 0; i--)
        stack.push(array[i]);
    return array;
}

var dataStructures = (function() {
    return {
        init: function(stack) {
            if (typeof currentAlgorithmFile != "undefined")
                prettyPrint(); // Prettify

            $("#pushButton").click(function() {
                var value = $("#elementInput").val();
                if (value) {
                    stack.push(value);
                    array = stackToArray(stack);
                }
            });

            $("#popButton").click(function() {
                $("#elementLabel").text(stack.pop() || "");
                array = stackToArray(stack);
            });

            Painter.init($("#canvas")[0]);
            setInterval(Painter.draw, 10);
        }
    };
})();
