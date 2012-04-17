var heapsort = (function() {
    function exchange(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function maxHeapify(array, root) {
        var left = (root == 0) ? 1 : 2 * root,
            right = left + 1,
            largest = (left < array.heapSize && array[left] > array[root])
            ? left : root;

        if (right < array.heapSize && array[right] > array[largest])
            largest = right;

        if (largest != root) {
            exchange(array, root, largest);
            maxHeapify(array, largest);
        }
    }

    function buildMaxHeap(array) {
        var i;
        array.heapSize = array.length;
        for (i = Math.round(array.length / 2); i >= 0; i--) {
            maxHeapify(array, i);
            update(array);
        }
    }

    return function(array) {
        var i;
        buildMaxHeap(array);
        for (i = array.length - 1; i >= 1; i--) {
            exchange(array, 0, i);
            array.heapSize--;
            maxHeapify(array, 0);
            update(array);
        }
    };
})();
