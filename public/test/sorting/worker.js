module("sorting/worker");

test("sleep", 1, function() {
    var now = new Date().getTime();
    sleep(1);
    ok(new Date().getTime() > now, "1 ms should have passed.");
});

test("update", 2, function() {
    var oldSleep = sleep,
        oldPostMessage = postMessage,
        slept, posted;
    sleep = function(ms) {
        slept = ms;
    };
    postMessage = function(message) {
        posted = message;
    };

    var array = [1, 2, 3];
    update(array);
    equal(slept, 200);
    deepEqual(posted.array, array);

    sleep = oldSleep;
    postMessage = oldPostMessage;
});

test("makeNumeric", 1, function() {
    var array = ["1", "2", "3"];
    makeNumeric(array);
    deepEqual(array, [1, 2, 3]);
});