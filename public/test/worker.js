module("worker");

test("sleep", function() {
    expect(1);
    var now = new Date().getTime();
    sleep(1);
    ok(new Date().getTime() > now, "1 ms should have passed.");
});

test("update", function() {
    expect(2);
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

test("makeNumeric", function() {
    expect(1);
    var array = ["1", "2", "3"];
    makeNumeric(array);
    deepEqual(array, [1, 2, 3]);
});