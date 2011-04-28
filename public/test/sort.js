module("sort", {
    setup: function() {
        temp = update;
        update = function() {};
    },
    teardown: function() {
        update = temp;
    }
});

$.each(["insertionSort", "mergeSort", "bubbleSort", "heapsort", "quicksort"],
       function(_, algorithmName) {
           function isSorted(array) {
               for (var i = 0; i < array.length - 1; i++)
                   if (array[i] >= array[i + 1])
                       return false;
               return true;
           }

           function sorted(array) {
               ok(isSorted(array),
                  "The array [" + array + "] should be sorted.");
           }

           test(algorithmName, function() {
               expect(2);
               var algorithm = window[algorithmName],
                   array = [7, 3, 5, 9, 2, 1, 6, 10, 4, 8];
               algorithm(array);
               sorted(array);
               var oddNumberedArray = [3, 2, 1];
               algorithm(oddNumberedArray);
               sorted(oddNumberedArray);
           });
       });
