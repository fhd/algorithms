module("sort", {
    setup: function() {
        temp = update;
        update = function() {};
    },
    teardown: function() {
        update = temp;
    }
});

$.each(["insertionSort", "mergeSort", "bubbleSort", "heapSort"],
       function(_, algorithmName) {
           function isSorted(array) {
               for (var i = 0; i < array.length - 1; i++)
                   if (array[i] >= array[i + 1])
                       return false;
               return true;
           }

           function sortAlgorithmTest(algorithm, array) {
               return function() {
                   expect(1);
                   algorithm(array);
                   ok(isSorted(array),
                      "The array [" + array + "] should be sorted.");
               };
           }

           var algorithm = window[algorithmName];
           test(algorithmName,
                sortAlgorithmTest(algorithm, [7, 3, 5, 9, 2, 1, 6, 10, 4, 8]));
           test(algorithmName + " - odd numbered array.",
                sortAlgorithmTest(algorithm, [3, 2, 1]));
       });
