module("sorting/display");

test("Array.shuffle", function() {
    expect(1);
    var array = [1, 2, 3, 4, 5];
    var shuffledArray = array.slice();
    shuffledArray.shuffle();
    notDeepEqual(array, shuffledArray);
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
    createDrawFunction function() {
        return expectedDrawFunction;
    };

    var oldSetInterval = setInterval, drawFunction;
    setInterval = function(f) {
        drawFunction = f;
    };

    sorting.init();

    ok(prettyPrintCalled, "Google Prettify should be activated.");
    equal(drawFunction, expectedDrawFunction,
          "The draw function interval should be set.");

    createDrawFunction = oldCreateDrawFunction;
    setInterval = oldSetInterval;
});