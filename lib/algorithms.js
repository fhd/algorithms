var categories = {
    sorting: {
        name: "Sorting",
        algorithms: {
            insertionSort: {
                name: "Insertion Sort",
                description: "A simple sort algorithm, works like most people "
                    + "sort cards on their hand."
            },
            mergeSort: {
                name: "Merge Sort",
                description: "A fast, recursive sort algorithm that divides "
                    + "and merges the input."
            },
            bubbleSort: {
                name: "Bubble Sort",
                description: "An extremely simple sort algorithm with so "
                    + "abysmal performance that this demonstration doesn't "
                    + "show every step."
            },
            heapsort: {
                name: "Heapsort",
                description: "A well performing sort algorithm that uses a "
                    + "binary heap."
            },
            quicksort: {
                name: "Quicksort",
                description: "A fast, recursive sort algorithm that partitions "
                    + "the input.",
            },
            randomizedQuicksort: {
                name: "Randomized Quicksort",
                description: "A variant of "
                    + "<a href=\"/quicksort\">Quicksort</a> that avoids the "
                    + "worst case running time by partitioning around a random "
                    + "pivot element."
            }
        }
    },
    dataStructures: {
        name: "Data Structures",
        algorithms: {
            stack: {
                name: "Stack",
                description: "A simple data structure that stores elements as "
                    + "on a physical stack: The first element inserted is the "
                    + "last to be extracted (FILO)."
            },
            queue: {
                name: "Queue",
                description: "A simple data structure that stores elements as "
                    + "on a physical queue: The first element inserted is the "
                    + "first to be extracted (FIFO)."
            },
            linkedList: {
                name: "Linked List",
                description: "A data structure that stores a dynamic number of "
                    + "elements."
            }
        }
    }
};

function createAlgorithms() {
    var algorithms = {};

    Object.keys(categories).forEach(function (categoryKey) {
        var category = categories[categoryKey];
        Object.keys(category.algorithms).forEach(function(algorithmKey) {
            var algorithm = category.algorithms[algorithmKey];
            algorithm.category = categoryKey;
            algorithms[algorithmKey] = algorithm;
        });
    });

    Object.keys(algorithms).forEach(function (key) {
        var value = algorithms[key];
        value.file = key + ".js";
        value.functionName = key;
        value.url = "/" + key;
    });

    return algorithms;
}

module.exports = {
    categories: categories,
    algorithms: createAlgorithms()
};
