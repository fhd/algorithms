module("sorting/display");

test("Array.shuffle", 1, function() {
    var array = [1, 2, 3, 4, 5],
        shuffledArray = array.slice();
    shuffledArray.shuffle();
    notDeepEqual(array, shuffledArray);
});

test("init", 2, function() {
    var f = testUtils.uniqueFunction();

    currentAlgorithmFile = "";
    prettyPrint = sinon.spy();
    sinon.stub(window, "createDrawFunction");
    createDrawFunction.returns(f);
    sinon.stub(window, "setInterval");

    sorting.init();

    ok(prettyPrint.called, "Google Prettify should be activated.");
    ok(setInterval.calledWith(f), "The draw function interval should be set.");

    createDrawFunction.restore();
    setInterval.restore();
});
