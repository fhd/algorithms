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

test("stackToArray", function() {
    expect(2);
    var s = new Stack();
    s.push(1);
    s.push(2);
    s.push(3);
    deepEqual(stackToArray(s), [3, 2, 1]);
    // Call twice to ensure that the stack remains unchanged.
    deepEqual(stackToArray(s), [3, 2, 1]);
});

test("stackToArrayWithAnEmptyStack", function() {
    expect(1);
    deepEqual(stackToArray(new Stack()), []);
});

test("push", function() {
    expect(2);
    var stack = new Stack(),
        pushButton = $("<input/>").attr("type", "button")
            .attr("id", "pushButton"),
        elementInput = $("<input/>").attr("type", "text")
            .attr("id", "elementInput").val(5);
    $("body").append(pushButton).append(elementInput);
    dataStructures.init(stack);
    pushButton.click();
    stop();
    setTimeout(function() {
        start();
        equal(boxes.length, 1);
        equal(boxes[0].content, "5");
        pushButton.remove();
        elementInput.remove();
    }, 100);
});

test("pop", function() {
    expect(2);
    var stack = new Stack(),
        popButton = $("<input/>").attr("type", "button")
            .attr("id", "popButton"),
        elementLabel = $("<label/>").attr("id", "elementLabel");
    stack.push(5);
    $("body").append(canvas).append(popButton).append(elementLabel);
    dataStructures.init(stack);
    boxes = [{content: "5"}];
    popButton.click();
    equal(elementLabel.text(), "5");
    stop();
    setTimeout(function() {
        start();
        deepEqual(boxes, []);
        popButton.remove();
        elementLabel.remove();
    }, 100);
});
