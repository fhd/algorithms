var boxes = [];

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

function addBox(index, value, callback) {
    var boxSize = 20,
        boxContent = new String(value),
        boxWidth = boxContent.length * boxSize;

    function insertFunction() {
        var pos;
        if (index == 0)
            pos = 0;
        else
            pos = boxes[index - 1].pos + boxes[index - 1].width;
        boxes.splice(index, 0, {
            pos: pos,
            width: boxWidth,
            height: boxSize,
            content: boxContent
        });
        callback();
    }

    if (index == 0)
        moveBoxes(boxWidth, insertFunction);
    else
        insertFunction();
}

function removeBox(index, callback) {
    if (boxes.length == 0) {
        callback();
        return;
    }

    var removedBox = boxes.splice(index, 1)[0];
    if (index == 0)
        moveBoxes(-1 * removedBox.width, callback);
    else
        callback();
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

function createStackOperations(stack) {
    var pushInput = $("<input/>").attr("type", "text")
            .attr("id", "pushInput").attr("size", "3"),
        pushButton = $("<input/>").attr("type", "button")
            .attr("id", "pushButton").attr("value", "Push"),
        popButton = $("<input/>").attr("type", "button")
            .attr("id", "popButton").attr("value", "Pop"),
        popOutput = $("<label/>").attr("id", "popOutput"),
        pushOperation = $("<div/>").attr("class", "operation")
            .append(pushInput).append(pushButton),
        popOperation = $("<div/>").attr("class", "operation")
            .append(popButton).append(popOutput);

    $("#operations").append(pushOperation).append(popOperation);

    pushButton.click(function() {
        var value = pushInput.val();
        if (!value)
            return;

        stack.push(value);
        disableOperations();
        addBox(0, value, enableOperations);
    });

    popButton.click(function() {
        popOutput.text(stack.pop() || "");
        disableOperations();
        removeBox(0, enableOperations);
    });
}

function createQueueOperations(queue) {
    var enqueueInput = $("<input/>").attr("type", "text")
            .attr("id", "enqueueInput").attr("size", "3"),
        enqueueButton = $("<input/>").attr("type", "button")
            .attr("id", "enqueueButton").attr("value", "Enqueue"),
        dequeueButton = $("<input/>").attr("type", "button")
            .attr("id", "dequeueButton").attr("value", "Dequeue"),
        dequeueOutput = $("<label/>").attr("id", "dequeueOutput"),
        enqueueOperation = $("<div/>").attr("class", "operation")
            .append(enqueueInput).append(enqueueButton),
        dequeueOperation = $("<div/>").attr("class", "operation")
            .append(dequeueButton).append(dequeueOutput);

    $("#operations").append(enqueueOperation).append(dequeueOperation);

    enqueueButton.click(function() {
        var value = enqueueInput.val();
        if (!value)
            return;

        queue.enqueue(value);
        disableOperations();
        addBox(0, value, enableOperations);
    });

    dequeueButton.click(function() {
        dequeueOutput.text(queue.dequeue() || "");
        disableOperations();
        removeBox(boxes.length - 1, enableOperations);
    });
}

var dataStructures = (function() {
    return {
        init: function(ds) {
            if (typeof currentAlgorithmFile != "undefined")
                prettyPrint(); // Prettify

            if (ds instanceof Stack)
                createStackOperations(ds);
            else if (ds instanceof Queue)
                createQueueOperations(ds);

            setInterval(createDrawFunction($("#canvas")[0], draw), 10);
        }
    };
})();
