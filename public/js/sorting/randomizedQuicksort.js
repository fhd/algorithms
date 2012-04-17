var randomizedQuicksort = (function() {
    function exchange(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function partition(array, start, end) {
        var last = end - 1,
            pivot = array[last],
            i = start - 1,
            j;

        for (j = start; j < last; j++)
            if (array[j] <= pivot)
                exchange(array, ++i, j);

        exchange(array, ++i, last);
        return i;
    }

    function randomizedPartition(array, start, end) {
        var randomPivot = Math.floor(Math.random() * (end - start) + start);
        exchange(array, end - 1, randomPivot);
        return partition(array, start, end);
    }

    return function(array, start, end) {
        var split;

        if (start == undefined)
            start = 0;
        if (end == undefined)
            end = array.length;

        if (start < end - 1) {
            split = randomizedPartition(array, start, end);
            update(array);
            randomizedQuicksort(array, start, split);
            randomizedQuicksort(array, split + 1, end);
        }
    };
})();
