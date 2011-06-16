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

var array = [],
    dataStructures = (function() {
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

                function draw(context, width, height) {
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
                        context.strokeRect(pos + padding, padding, boxWidth,
                                           boxSize);
                        context.fillText(value, pos + padding + textPadding,
                                         padding + textPadding);
                        pos += boxWidth;
                    });
                }
                setInterval(createDrawFunction($("#canvas"), draw), 10);
            }
        };
    })();
