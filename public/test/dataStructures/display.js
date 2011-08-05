module("dataStructures/display", {
    setup: function() {
        $("body").append($("<canvas/>").attr("id", "canvas"));
    },
    teardown: function() {
        $("#canvas").remove();
    }
});

test("init", function() {
    expect(2);

    currentAlgorithmFile = "";

    var prettyPrintCalled = false;
    prettyPrint = function() {
        prettyPrintCalled = true;
    };

    var oldCreateDrawFunction = createDrawFunction,
        expectedDrawFunction = function() {};
    createDrawFunction = function() {
        return expectedDrawFunction;
    };

    var oldSetInterval = setInterval, drawFunction;
    setInterval = function(f) {
        drawFunction = f;
    };

    dataStructures.init();

    ok(prettyPrintCalled, "Google Prettify should be activated.");
    equal(drawFunction, expectedDrawFunction,
          "The draw function interval should be set.");

    createDrawFunction = oldCreateDrawFunction;
    setInterval = oldSetInterval;
});

test("initStack", function() {
    expect(10);

    var operations = $("<div/>").attr("id", "operations");
    $("body").append(operations);

    dataStructures.init(new Stack());
    var pushButton = $("#pushButton"),
        popButton = $("#popButton");
    ok(pushButton.length,
       "A button for the push operation should be created.");
    ok(popButton.length,
       "A button for the pop operation should be created.");

    var oldAddBox = addBox,
        oldRemoveBox = removeBox,
        boxAddedIndex, boxAddedValue, boxRemovedIndex;
    boxes.length = 0;
    addBox = function(index, value, callback) {
        boxAddedIndex = index;
        boxAddedValue = value;
        boxes.length++;
        callback();
    };
    removeBox = function(index, callback) {
        boxRemovedIndex = index;
        boxes.length--;
        callback();
    };

    function testPush(value) {
        $("#pushInput").val(value);
        pushButton.click();
        equal(boxAddedIndex, 0);
        equal(boxAddedValue, value);
    }

    function testPop(value) {
        popButton.click()
        equal(boxRemovedIndex, 0);
        equal($("#popOutput").text(), value);
    }

    testPush("5");
    testPush("6");

    testPop("6");
    testPop("5");

    operations.remove();
    addBox = oldAddBox;
    removeBox = oldRemoveBox;
});

test("initQueue", function() {
    expect(10);

    var operations = $("<div/>").attr("id", "operations");
    $("body").append(operations);

    dataStructures.init(new Queue());
    var enqueueButton = $("#enqueueButton"),
        dequeueButton = $("#dequeueButton");
    ok(enqueueButton.length,
       "A button for the enqueue operation should be created.");
    ok(dequeueButton.length,
       "A button for the dequeue operation should be created.");

    var oldAddBox = addBox,
        oldRemoveBox = removeBox,
        boxAddedIndex, boxAddedValue, boxRemovedIndex;
    boxes.length = 0;
    addBox = function(index, value, callback) {
        boxAddedIndex = index;
        boxAddedValue = value;
        boxes.length++;
        callback();
    };
    removeBox = function(index, callback) {
        boxRemovedIndex = index;
        boxes.length--;
        callback();
    };

    function testEnqueue(value, index) {
        $("#enqueueInput").val(value);
        enqueueButton.click();
        equal(boxAddedIndex, index);
        equal(boxAddedValue, value);
    }

    function testDequeue(value, index) {
        dequeueButton.click()
        equal(boxRemovedIndex, index);
        equal($("#dequeueOutput").text(), value);
    }

    testEnqueue("5", 0);
    testEnqueue("6", 0);

    testDequeue("5", 1);
    testDequeue("6", 0);

    operations.remove();
    addBox = oldAddBox;
    removeBox = oldRemoveBox;
});

test("initLinkedList", function() {
    expect(11);

    var operations = $("<div/>").attr("id", "operations");
    $("body").append(operations);

    dataStructures.init(new LinkedList());
    var insertButton = $("#insertButton"),
        deleteButton = $("#deleteButton");
    ok(insertButton.length,
       "A button for the insert operation should be created.");
    ok(deleteButton.length,
       "A button for the delete operation should be created.");

    var oldAddBox = addBox,
        oldRemoveBox = removeBox,
        boxAddedIndex, boxAddedValue, boxRemovedIndex;
    boxes.length = 0;
    addBox = function(index, value, callback) {
        boxAddedIndex = index;
        boxAddedValue = value;
        boxes.length++;
        callback();
    };
    removeBox = function(index, callback) {
        boxRemovedIndex = index;
        boxes.length--;
        callback();
    };

    function testInsert(value, index) {
        $("#insertInput").val(value);
        insertButton.click();
        equal(boxAddedIndex, index);
        equal(boxAddedValue, value);
    }

    function testDelete(value, index) {
        $("#deleteInput").val(value);
        deleteButton.click()
        equal(boxRemovedIndex, index);
    }

    testInsert("5", 0);
    testInsert("6", 1);
    testInsert("7", 2);

    testDelete("6", 1);
    testDelete("5", 0);
    testDelete("7", 0);

    operations.remove();
    addBox = oldAddBox;
    removeBox = oldRemoveBox;
});

test("addBox", function() {
    expect(2);
    dataStructures.init();
    addBox(0, "5", function() {});
    stop();
    setTimeout(function() {
        start();
        equal(boxes.length, 1);
        equal(boxes[0].content, "5");
    }, 100);
});

test("removeBox", function() {
    expect(1);
    dataStructures.init();
    boxes = [{content: "5"}];
    removeBox(0, function() {});
    stop();
    setTimeout(function() {
        start();
        deepEqual(boxes, []);
    }, 100);
});
