function isSorted(array) {
    for (var i = 0; i < array.length - 1; i++)
        if (array[i] >= array[i + 1])
            return false;
    return true;
}

function sortAlgorithmTest(algorithm) {
    return function() {
        expect(1);
        var array = [7, 3, 5, 9, 2, 1, 6, 10, 4, 8];
        algorithm(array);
        ok(isSorted(array), "The array [" + array + "] isn't sorted.");
    };
}

test("Insertion Sort", sortAlgorithmTest(insertionSort));
test("Merge Sort", sortAlgorithmTest(mergeSort));
test("Bubble Sort", sortAlgorithmTest(bubbleSort));
test("Heap Sort", sortAlgorithmTest(heapSort));

