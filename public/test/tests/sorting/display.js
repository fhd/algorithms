module("sorting/display");

test("Array.shuffle", 1, function() {
    var array = [1, 2, 3, 4, 5],
        shuffledArray = array.slice();
    shuffledArray.shuffle();
    notDeepEqual(array, shuffledArray);
});

test("init", 1, function() {
    currentAlgorithmFile = "";
    sinon.stub(display, "init");
    sorting.init();
    ok(display.init.called, "The display should be initialised.");
    display.init.restore();
});
