module("dataStructures/display");

test("Painter", function() {
    expect(1);

    var mockContextUsed = false,
        mockFunction = function() {
            mockContextUsed = true;
        },
        mockCanvas = createMockCanvas({
            clearRect: mockFunction,
            strokeRect: mockFunction,
            fillText: mockFunction
        });

    Painter.init(mockCanvas);
    Painter.draw();
    ok(mockContextUsed,
       "The painter should use the context of the supplied canvas.");
});

test("init", function() {
    expect(2);

    currentAlgorithmFile = "";

    var prettyPrintCalled = false;
    prettyPrint = function() {
        prettyPrintCalled = true;
    };

    var oldPainter = Painter;
    Painter = {
        init: function() {},
        draw: function() {}
    };

    var oldSetInterval = setInterval, drawFunction;
    setInterval = function(f) {
        drawFunction = f;
    };

    dataStructures.init();

    ok(prettyPrintCalled, "Google Prettify should be activated.");
    equal(Painter.draw, drawFunction,
          "The draw function interval should be set.");

    Painter = oldPainter;
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

test("stackToArrayWithAnEmptySet", function() {
    expect(1);
    deepEqual(stackToArray(new Stack()), []);
});

function createMockCanvas(context) {
    return {
        width: 100,
        height: 100,
        getContext: function() {
            return context ? context : {
                clearRect: function() {},
                strokeRect: function() {},
                fillText: function() {}
            };
        }
    };
}

test("push", function() {
    expect(1);
    var stack = new Stack();

    var pushFunction;
    $ = function(element) {
        if (element == "#canvas")
            return [createMockCanvas()];
        else
            return {
                click: function(f) {
                    if (element == "#pushButton")
                        pushFunction = f;
                },
                val: function() {
                    return "5";
                }
            };
    }
    dataStructures.init(stack);
    pushFunction();
    deepEqual(array, ["5"]);
});

test("pop", function() {
    expect(2);
    var stack = new Stack();
    stack.pop = function(element) {
        return 5;
    };

    var popFunction, maxLabelText;
    $ = function(element) {
        if (element == "#canvas")
            return [createMockCanvas()];
        else
            return {
                click: function(f) {
                    if (element == "#popButton")
                        popFunction = f;
                },
                text: function(s) {
                    labelText = s;
                }
            };
    }
    dataStructures.init(stack);
    popFunction();
    deepEqual(array, []);
    equal("5", labelText);
});
