function bubbleSort(array) {
    var i, j, temp;

    for (i = 0; i < array.length; i++) {
        for (j = array.length; j > i; j--)
            if (array[j] < array[j - 1]) {
                temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        update(array);
    }
}