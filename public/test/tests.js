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
        ok(isSorted(array), "The array [" + array + "] should be sorted.");
    };
}

var unsortedArray = [7, 3, 5, 9, 2, 1, 6, 10, 4, 8];

test("Insertion Sort", sortAlgorithmTest(insertionSort, unsortedArray));
test("Merge Sort", sortAlgorithmTest(mergeSort, unsortedArray));
test("Merge Sort - Odd number of elements",
     sortAlgorithmTest(mergeSort, [3, 2, 1]));
test("Bubble Sort", sortAlgorithmTest(bubbleSort, unsortedArray));
test("Heap Sort", sortAlgorithmTest(heapSort, unsortedArray));

