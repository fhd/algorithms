module("dataStructures/display", {
    setup: function() {
        $("body").append($("<canvas/>").attr("id", "canvas"));
        sinon.stub(display, "init");
    },
    teardown: function() {
        $("#canvas").remove();
        display.init.restore();
    }
});

test("init", 1, function() {
    currentAlgorithmFile = "";
    dataStructures.init();
    ok(display.init.called, "The display should be initialised.");
});

test("addBox", 2, function() {
    dataStructures.init();
    dataStructures.addBox(0, "5", function() {});
    stop();
    setTimeout(function() {
        start();
        equal(dataStructures.boxes.length, 1);
        equal(dataStructures.boxes[0].content, "5");
    }, 100);
});

test("removeBox", 1, function() {
    dataStructures.init();
    dataStructures.boxes = [{content: "5"}];
    dataStructures.removeBox(0, function() {});
    stop();
    setTimeout(function() {
        start();
        deepEqual(dataStructures.boxes, []);
    }, 100);
});

module("dataStructures/display", {
    setup: function() {
        $("body").append($("<div/>").attr("id", "operations"));
        dataStructures.boxes = [];
        sinon.stub(dataStructures, "addBox", function() {
            dataStructures.boxes.push({});
        });
        sinon.stub(dataStructures, "removeBox", function() {
            dataStructures.boxes.pop();
        });
    },
    teardown: function() {
        dataStructures.addBox.restore();
        dataStructures.removeBox.restore();
        $("#operations").remove();
    }
});

test("initStack", 8, function() {
    dataStructures.init(new Stack());

    var pushButton = $("#pushButton"),
        popButton = $("#popButton");

    ok(pushButton.length,
       "A button for the push operation should be created.");
    ok(popButton.length,
       "A button for the pop operation should be created.");

    ["5", "6"].forEach(function(value) {
        $("#pushInput").val(value);
        pushButton.click();
        ok(dataStructures.addBox.calledWith(0, value), "A box with value " +
           value + " should be added.");        
    });

    ["6", "5"].forEach(function(value) {
        popButton.click()
        ok(dataStructures.removeBox.calledWith(0), "The box with value " +
           value + " should be removed.");
        equal($("#popOutput").text(), value);
    });
});

test("initQueue", 8, function() {
    dataStructures.init(new Queue());

    var enqueueButton = $("#enqueueButton"),
        dequeueButton = $("#dequeueButton");

    ok(enqueueButton.length,
       "A button for the enqueue operation should be created.");
    ok(dequeueButton.length,
       "A button for the dequeue operation should be created.");

    [["5", 0], ["6", 0]].forEach(function(pair) {
        var value = pair[0],
            index = pair[1];
        $("#enqueueInput").val(value);
        enqueueButton.click();
        ok(dataStructures.addBox.calledWith(index, value), "A box with value " +
           value + " should be added at position " + index + ".");
    });

    [["5", 1], ["6", 0]].forEach(function(pair) {
        var value = pair[0],
            index = pair[1];
        dequeueButton.click()
        ok(dataStructures.removeBox.calledWith(index), "The box at index " +
           index + " should be removed.");
        equal($("#dequeueOutput").text(), value);
    });
});

test("initLinkedList", 8, function() {
    dataStructures.init(new LinkedList());

    var insertButton = $("#insertButton"),
        deleteButton = $("#deleteButton");

    ok(insertButton.length,
       "A button for the insert operation should be created.");
    ok(deleteButton.length,
       "A button for the delete operation should be created.");

    [["5", 0], ["6", 1], ["7", 2]].forEach(function(pair) {
        var value = pair[0],
            index = pair[1];
        $("#insertInput").val(value);
        insertButton.click();
        ok(dataStructures.addBox.calledWith(index, value), "A box with value " +
           value + " should be added at position " + index + ".");
    });

    [["6", 1], ["5", 0], ["7", 0]].forEach(function(pair) {
        var value = pair[0],
            index = pair[1];
        $("#deleteInput").val(value);
        deleteButton.click()
        ok(dataStructures.removeBox.calledWith(index), "The box at index " +
           index + " should be removed.");
    });
});
