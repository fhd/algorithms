module("sorting/display");

test("Array.shuffle", function() {
    expect(1);
    var array = [1, 2, 3, 4, 5];
    var shuffledArray = array.slice();
    shuffledArray.shuffle();
    notDeepEqual(array, shuffledArray);
});

test("Painter", function() {
    expect(1);

    var mockContextUsed = false,
        mockContext = {
            clearRect: function() {
                mockContextUsed = true;
            },
            fillRect: function() {
                mockContextUsed = true;
            }
        },
        mockCanvas = {
            width: 100,
            height: 100,
            getContext: function() {
                return mockContext;
            }
        };

    Painter.init(mockCanvas);
    Painter.draw();
    ok(mockContextUsed,
       "The Painter should use the context of the supplied canvas.");
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

    init();

    ok(prettyPrintCalled, "Google Prettify should be activated.");
    equal(drawFunction, Painter.draw,
          "The draw function interval should be set.");

    Painter = oldPainter;
    setInterval = oldSetInterval;
});