var algorithms = {
    insertionSort: {
        name: "Insertion Sort",
        description: "A simple sort algorithm, works like most people sort cards on their hand.",
        category: "sorting"
    },
    mergeSort: {
        name: "Merge Sort",
        description: "A fast, recursive sort algorithm that divides and merges the input.",
        category: "sorting"
    },
    bubbleSort: {
        name: "Bubble Sort",
        description: "An extremely simple sort algorithm with so abysmal performance that this demonstration doesn't show every step.",
        category: "sorting"
    },
    heapsort: {
        name: "Heapsort",
        description: "A well performing sort algorithm that uses a binary heap.",
        category: "sorting"
    },
    quicksort: {
        name: "Quicksort",
        description: "A fast, recursive sort algorithm that partitions the input.",
        category: "sorting"
    },
    randomizedQuicksort: {
        name: "Randomized Quicksort",
        description: "A variant of Quicksort that avoids the worst case running time by partitioning around a random pivot element.",
        category: "sorting"
    }
};

var $ = require("jquery");

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
    res.render("index", {"algorithms": algorithms});
});

var fs = require("fs");

app.get("/:algorithm", function(req, res) {
    var algorithm = algorithms[req.params.algorithm];
    if (algorithm) {
        algorithm.code = fs.readFileSync("public/js/" + algorithm.category
                                         + "/" + algorithm.file);
        res.render(algorithm.category, {
            currentAlgorithm: algorithm,
            "algorithms": algorithms
        });
    } else
        res.send(404);
});

app.listen(9280);
