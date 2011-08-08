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
}

var $ = require("jquery"), algorithms = {};

$.each(categories, function (categoryKey, category) {
    $.each(category.algorithms, function(algorithmKey, algorithm) {
        algorithm.category = categoryKey;
        algorithms[algorithmKey] = algorithm;
    });
});

$.each(algorithms, function (key, value) {
    value.file = key + ".js";
    value.functionName = key;
    value.url = "/" + key;
});

var express = require("express"),
    app = module.exports = express.createServer();

app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + "/public"));
});

app.configure("development", function() {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure("production", function() {
    app.use(express.errorHandler());
});

app.get("/", function(req, res) {
    res.render("index", {"categories": categories});
});

var fs = require("fs");

app.get("/:algorithm", function(req, res) {
    var algorithm = algorithms[req.params.algorithm];
    if (algorithm) {
        algorithm.code = fs.readFileSync("public/js/" + algorithm.category
                                         + "/" + algorithm.file);
        res.render(algorithm.category, {
            currentAlgorithm: algorithm,
            "categories": categories
        });
    } else
        res.send(404);
});

app.listen(10605);
