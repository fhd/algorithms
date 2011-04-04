function merge(array1, array2) {
    var array = [],
        j = 0,
        k = 0;
    for (var i = 0; i < array1.length + array2.length; i++) {
        if (j < array1.length && (k == array2.length || array1[j] <= array2[k]))
            array[i] = array1[j++];
        else
            array[i] = array2[k++];
    }
    return array;
}

function sort(array) {
    if (array.length == 1)
        return array;

    var middle = array.length / 2;
    return merge(sort(array.slice(0, middle)),
                 sort(array.slice(middle)));
}
