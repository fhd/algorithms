(function() {
    function makeNumeric(array) {
        for (var i = 0; i < array.length; i++)
            array[i] = parseInt(array[i]);
    }

    sleep = function(ms) {
        var start = new Date().getTime();
        while (new Date().getTime() - start < ms);
    }

    update = function(array) {
        postMessage({"array": array, finished: false});
        sleep(200);
    }

    onmessage = function(event) {
        var array = event.data.array;
        makeNumeric(array);
        importScripts(event.data.file);
        var algorithm = eval(event.data.functionName);
        algorithm(array);
        postMessage({"array": array, finished: true});
    };
})();
