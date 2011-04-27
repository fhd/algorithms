function sleep(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() - start < ms);
}

function update(array) {
    postMessage({"array": array, finished: false});
    sleep(200);
}

function makeNumeric(array) {
    for (var i = 0; i < array.length; i++)
        array[i] = parseInt(array[i]);
}

onmessage = function(event) {
    var array = event.data.array;
    makeNumeric(array);
    importScripts(event.data.script);
    // TODO: Find a better way to get the function.
    var algorithm = eval(event.data.script.replace(".js", ""));
    algorithm(array);
    postMessage({"array": array, finished: true});
}