module("dataStructures/display", {
    setup: function() {
        $("body").append($("<canvas/>").attr("id", "canvas"));
    },
    teardown: function() {
        $("#canvas").remove();
    }
});

test("init", 2, function() {
    var f = testUtils.uniqueFunction();

    currentAlgorithmFile = "";
    prettyPrint = sinon.spy();
    sinon.stub(window, "createDrawFunction");
    createDrawFunction.returns(f);
    sinon.stub(window, "setInterval");

    dataStructures.init();

    ok(prettyPrint.called, "Google Prettify should be activated.");
    ok(setInterval.calledWith(f), "The draw function interval should be set.");

    createDrawFunction.restore();
    setInterval.restore();
});

test("initStack", 8, function() {
    var operations = $("<div/>").attr("id", "operations"),
        pushButton, popButton;

    function testPush(value) {
        $("#pushInput").val(value);
        pushButton.click();
        ok(addBox.calledWith(0, value), "A box with value " + value +
           " should be added.");        
    }

    function testPop(value) {
        popButton.click()
        ok(removeBox.calledWith(0), "The box with value " + value +
           " should be removed.");
        equal($("#popOutput").text(), value);
    }

    $("body").append(operations);
    dataStructures.init(new Stack());

    pushButton = $("#pushButton");
    popButton = $("#popButton");

    ok(pushButton.length,
       "A button for the push operation should be created.");
    ok(popButton.length,
       "A button for the pop operation should be created.");

    boxes = [];
    sinon.stub(window, "addBox", function() {
        boxes.push({});
    });
    sinon.stub(window, "removeBox", function() {
        boxes.pop();
    });

    testPush("5");
    testPush("6");

    testPop("6");
    testPop("5");

    operations.remove();
    addBox.restore();
    removeBox.restore();
});

test("initQueue", 8, function() {
    var operations = $("<div/>").attr("id", "operations"),
        enqueueButton, dequeueButton;

    $("body").append(operations);

    function testEnqueue(value, index) {
        $("#enqueueInput").val(value);
        enqueueButton.click();
        ok(addBox.calledWith(index, value), "A box with value " + value +
           " should be added at position " + index + ".");
    }

    function testDequeue(value, index) {
        dequeueButton.click()
        ok(removeBox.calledWith(index), "The box at index " + index +
           " should be removed.");
        equal($("#dequeueOutput").text(), value);
    }

    dataStructures.init(new Queue());

    enqueueButton = $("#enqueueButton");
    dequeueButton = $("#dequeueButton");

    ok(enqueueButton.length,
       "A button for the enqueue operation should be created.");
    ok(dequeueButton.length,
       "A button for the dequeue operation should be created.");

    boxes = [];
    sinon.stub(window, "addBox", function() {
        boxes.push({});
    });
    sinon.stub(window, "removeBox", function() {
        boxes.pop();
    });

    testEnqueue("5", 0);
    testEnqueue("6", 0);

    testDequeue("5", 1);
    testDequeue("6", 0);

    operations.remove();
    addBox.restore();
    removeBox.restore();
});

test("initLinkedList", 8, function() {
    var operations = $("<div/>").attr("id", "operations"),
        insertButton, deleteButton;

    function testInsert(value, index) {
        $("#insertInput").val(value);
        insertButton.click();
        ok(addBox.calledWith(index, value), "A box with value " + value +
           " should be added at position " + index + ".");
    }

    function testDelete(value, index) {
        $("#deleteInput").val(value);
        deleteButton.click()
        ok(removeBox.calledWith(index), "The box at index " + index +
           " should be removed.");
    }

    $("body").append(operations);
    dataStructures.init(new LinkedList());

    insertButton = $("#insertButton");
    deleteButton = $("#deleteButton");

    ok(insertButton.length,
       "A button for the insert operation should be created.");
    ok(deleteButton.length,
       "A button for the delete operation should be created.");

    boxes = [];
    sinon.stub(window, "addBox", function() {
        boxes.push({});
    });
    sinon.stub(window, "removeBox", function() {
        boxes.pop();
    });

    testInsert("5", 0);
    testInsert("6", 1);
    testInsert("7", 2);

    testDelete("6", 1);
    testDelete("5", 0);
    testDelete("7", 0);

    operations.remove();
    addBox.restore();
    removeBox.restore();
});

test("addBox", 2, function() {
    dataStructures.init();
    addBox(0, "5", function() {});
    stop();
    setTimeout(function() {
        start();
        equal(boxes.length, 1);
        equal(boxes[0].content, "5");
    }, 100);
});

test("removeBox", 1, function() {
    dataStructures.init();
    boxes = [{content: "5"}];
    removeBox(0, function() {});
    stop();
    setTimeout(function() {
        start();
        deepEqual(boxes, []);
    }, 100);
});
