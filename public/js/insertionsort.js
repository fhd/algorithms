importScripts("worker.js");
algorithm = function(array) {
    for (var i = 1; i < array.length; i++) {
        var key = array[i];
        for (var j = i - 1; j >= 0 && array[j] > key; j--)
            array[j + 1] = array[j];
        array[j + 1] = key;
        update(i, array);
    }
};
