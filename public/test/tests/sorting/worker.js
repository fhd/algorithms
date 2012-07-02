module("sorting/worker");

test("sleep", 1, function() {
    var now = new Date().getTime();
    sleep(1);
    ok(new Date().getTime() > now, "1 ms should have passed.");
});

test("update", 2, function() {
    sinon.stub(window, "sleep");
    sinon.stub(window, "postMessage");

    var array = [1, 2, 3];
    update(array);

    ok(sleep.calledWith(200), "Should sleep on each update.");
    ok(postMessage.calledWith({array: array, finished: false}),
       "The array should be posted to the main thread.");

    sleep.restore();
    postMessage.restore();
});

test("onmessage", 3, function() {
    f = sinon.stub();
    importScripts = sinon.stub();
    sinon.stub(window, "postMessage");

    onmessage({data: {
        array: ["1", "2", "3"],
        file: "f.js",
        functionName: "f"
    }});

    ok(importScripts.calledWith("f.js"),
       "The supplied JS file should be loaded.");
    ok(f.calledWith([1, 2, 3]),
       "The sort function should be called with the array.");
    ok(postMessage.calledWith({array: [1, 2, 3], finished: true}),
       "The worker should post a message with the result.");

    f = importScripts = undefined;
    postMessage.restore();
});
