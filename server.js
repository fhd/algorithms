var algorithms = {
    insertionsort: {
        id: "insertionsort",
        name: "Insertion Sort"
    },
    mergesort: {
        id: "mergesort",
        name: "Merge Sort"
    }
};

var express = require("express");
var app = module.exports = express.createServer();

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

app.get("/:algorithm", function(req, res) {
    var algorithm = algorithms[req.params.algorithm];
    if (algorithm)
        res.render("algorithm", {
            currentAlgorithm: algorithm,
            "algorithms": algorithms
        });
    else
        res.send(404);
});

app.listen(8124);