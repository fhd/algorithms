function insertionSort(array) {
    var i, key, j;

    for (i = 1; i < array.length; i++) {
        key = array[i];
        for (j = i - 1; j >= 0 && array[j] > key; j--)
            array[j + 1] = array[j];
        array[j + 1] = key;
        update(array);
    }
}
