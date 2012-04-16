var boxes = [],
    dataStructures = {
        init: function(ds) {
            if (typeof currentAlgorithmFile != "undefined")
                prettyPrint(); // Prettify

            if (ds instanceof Stack)
                createStackOperations(ds);
            else if (ds instanceof Queue)
                createQueueOperations(ds);
            else if (ds instanceof LinkedList)
                createLinkedListOperations(ds);

            setInterval(createDrawFunction($("#canvas")[0], draw), 10);
        }
    };

function draw(context, width, height) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "12px sans";
    context.textBaseline = "top";
    $.each(boxes, function(_, box) {
        var padding = 5,
            textPadding = 5;
        context.strokeRect(box.pos + padding, padding, box.width,
                           box.height);
        context.fillText(box.content, box.pos + padding + textPadding,
                         padding + textPadding);
    });
}

function moveBoxes(distance, startIndex, callback) {
    var boxesToMove = boxes.slice(startIndex),
        boxMover;

    $.each(boxesToMove, function(_, box) {
        box.goal = box.pos + distance;
    });

    boxMover = setInterval(function() {
        var finished = true;
        $.each(boxesToMove, function(_, box) {
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
        moveBoxes(boxWidth, 0, insertFunction);
    else
        insertFunction();
}

function removeBox(index, callback) {
    var removedBox;

    if (boxes.length == 0) {
        callback();
        return;
    }

    removedBox = boxes.splice(index, 1)[0];
    if (index < boxes.length)
        moveBoxes(-1 * removedBox.width, index, callback);
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

function createLinkedListOperations(linkedList) {
    var insertInput = $("<input/>").attr("type", "text")
            .attr("id", "insertInput").attr("size", "3"),
        insertButton = $("<input/>").attr("type", "button")
            .attr("id", "insertButton").attr("value", "Insert"),
        deleteButton = $("<input/>").attr("type", "button")
            .attr("id", "deleteButton").attr("value", "Delete"),
        deleteInput = $("<input/>").attr("type", "text")
            .attr("id", "deleteInput").attr("size", "3"),
        insertOperation = $("<div/>").attr("class", "operation")
            .append(insertInput).append(insertButton),
        deleteOperation = $("<div/>").attr("class", "operation")
            .append(deleteInput).append(deleteButton);

    $("#operations").append(insertOperation).append(deleteOperation);

    insertButton.click(function() {
        var value = insertInput.val();
        if (!value)
            return;

        linkedList.insert({key: value});
        disableOperations();
        addBox(boxes.length, value, enableOperations);
    });

    deleteButton.click(function() {
        var value = deleteInput.val(),
            index;

        if (!value || !linkedList.search(value))
            return;

        index = linkedList.toArray().indexOf(value);

        linkedList.delete(linkedList.search(value));
        disableOperations();
        removeBox(index, enableOperations);
    });
}
