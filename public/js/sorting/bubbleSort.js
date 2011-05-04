function bubbleSort(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = array.length; j > i; j--)
            if (array[j] < array[j - 1]) {
                var temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        update(array);
    }
}