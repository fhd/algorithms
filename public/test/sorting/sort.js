module("sorting/sort", {
    setup: function() {
        temp = update;
        update = function() {};
    },
    teardown: function() {
        update = temp;
    }
});

$.each([insertionSort, mergeSort, bubbleSort, heapsort, quicksort,
        randomizedQuicksort], function(_, algorithm) {
           Array.prototype.isSorted = function() {
               for (var i = 0; i < this.length - 1; i++)
                   if (this[i] >= this[i + 1])
                       return false;
               return true;
           };

           Array.prototype.containsAll = function(array) {
               if (this.length < array.length)
                   return false;

               for (var i = 0; i < array.length; i++)
                   if (this.indexOf(array[i]) == -1)
                       return false;
               return true;
           };

           test(algorithm.name, function() {
               expect(4);
               var array = [7, 3, 5, 9, 2, 1, 6, 10, 4, 8],
                   oddNumberedArray = [3, 2, 1];
               $.each([array, oddNumberedArray], function(_, array) {
                       var originalArray = array.slice(0);
                       algorithm(array);
                       ok(array.isSorted(),
                          "The array [" + array + "] should be sorted.");
                       ok(array.containsAll(originalArray),
                          "The array [" + array + "] should contain all elements from "
                          + "the original array [" + originalArray + "].");
                   });
           });
       });
