var algorithm;

function sleep(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() - start < ms);
}

function update(currentIndex, array) {
    postMessage({
        "currentIndex": currentIndex,
        "array": array,
    });
    sleep(200);
}

function makeNumeric(array) {
    for (var i = 0; i < array.length; i++)
        array[i] = parseInt(array[i]);
}

onmessage = function(event) {
    var array = event.data;
    makeNumeric(array);
    algorithm(array);
    postMessage({"array": array});
}