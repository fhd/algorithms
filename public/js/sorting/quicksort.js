var quicksort = (function() {
    function exchange(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function partition(array, start, end) {
        var last = end - 1,
            pivot = array[last],
            i = start - 1;

        for (var j = start; j < last; j++)
            if (array[j] <= pivot)
                exchange(array, ++i, j);

        exchange(array, ++i, last);
        return i;
    }

    return function(array, start, end) {
        if (typeof start === "undefined")
            start = 0;
        if (typeof end === "undefined")
            end = array.length;

        if (start < end - 1) {
            var split = partition(array, start, end);
            update(array);
            quicksort(array, start, split);
            quicksort(array, split + 1, end);
        }
    };
})();
