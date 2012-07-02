module("sorting/sort", {
    setup: function() {
        sinon.stub(window, "update");
    },
    teardown: function() {
        update.restore();
    }
});

function isSorted(array) {
    for (var i = 0; i < array.length - 1; i++)
        if (array[i] >= array[i + 1])
            return false;
    return true;
};

function containsAll(array1, array2) {
    if (array1.length < array2.length)
        return false;

    for (var i = 0; i < array2.length; i++)
        if (array1.indexOf(array2[i]) === -1)
            return false;
    return true;
};

$([insertionSort, mergeSort, bubbleSort, heapsort, quicksort,
   randomizedQuicksort])
    .each(function(_, algorithm) {
        test(algorithm.name, 4, function() {
            var array = [7, 3, 5, 9, 2, 1, 6, 10, 4, 8],
                oddNumberedArray = [3, 2, 1];
            $.each([array, oddNumberedArray], function(_, array) {
                var originalArray = array.slice(0);
                algorithm(array);
                ok(isSorted(array),
                   "The array [" + array + "] should be sorted.");
                ok(containsAll(array, originalArray),
                   "The array [" + array + "] should contain all elements from "
                   + "the original array [" + originalArray + "].");
            });
        });
    });
