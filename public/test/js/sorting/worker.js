module("sorting/worker");

test("sleep", 1, function() {
    var now = new Date().getTime();
    sleep(1);
    ok(new Date().getTime() > now, "1 ms should have passed.");
});

test("update", 2, function() {
    var array = [1, 2, 3];

    sinon.stub(window, "sleep");
    sinon.stub(window, "postMessage");

    update(array);

    ok(sleep.calledWith(200), "Should sleep on each update.");
    ok(postMessage.calledWith({array: array, finished: false}),
       "The array should be posted to the main thread.");

    sleep.restore();
    postMessage.restore();
});

test("makeNumeric", 1, function() {
    var array = ["1", "2", "3"];
    makeNumeric(array);
    deepEqual(array, [1, 2, 3]);
});