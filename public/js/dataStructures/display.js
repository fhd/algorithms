var boxes = [];

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

function draw(context, width, height) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "12px sans";
    context.textBaseline = "top";
    var padding = 5,
        textPadding = 5;
    $.each(boxes, function(_, box) {
        context.strokeRect(box.pos + padding, padding, box.width,
                           box.height);
        context.fillText(box.content, box.pos + padding + textPadding,
                         padding + textPadding);
    });
}

function moveBoxes(distance, callback) {
    $.each(boxes, function(_, box) {
        box.goal = box.pos + distance;
    });

    var boxMover = setInterval(function() {
        var finished = true;
        $.each(boxes, function(_, box) {
            if (typeof box.goal == "undefined")
                return;

            finished = false;
            if (box.pos < box.goal)
                box.pos++;
            else if (box.pos > box.goal)
                box.pos--;
            else {
                delete box.goal;
                finished = true;
            }
        });

        if (finished) {
            clearInterval(boxMover);
            callback();
        }
    }, 5);
}

function addBox(value, callback) {
    var boxSize = 20,
        boxContent = new String(value),
        boxWidth = boxContent.length * boxSize;

    moveBoxes(boxWidth, function() {
        boxes.push({
            pos: 0,
            width: boxWidth,
            height: boxSize,
            content: boxContent
        });
        callback();
    });
}

function removeBox(callback) {
    if (boxes.length == 0) {
        callback();
        return;
    }

    var topBox = boxes.pop();
    moveBoxes(-1 * topBox.width, callback);
}

function operations() {
    return $("div.operation input");
}

function disableOperations() {
    operations().attr("disabled", "true");
}

function enableOperations() {
    operations().removeAttr("disabled");
}

var dataStructures = (function() {
    return {
        init: function(stack) {
            if (typeof currentAlgorithmFile != "undefined")
                prettyPrint(); // Prettify

            $("#pushButton").click(function() {
                var value = $("#elementInput").val();
                if (!value)
                    return;

                stack.push(value);
                disableOperations();
                addBox(value, enableOperations);
            });

            $("#popButton").click(function() {
                $("#elementLabel").text(stack.pop() || "");
                disableOperations();
                removeBox(enableOperations);
            });

            setInterval(createDrawFunction($("#canvas")[0], draw), 10);
        }
    };
})();
