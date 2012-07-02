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

var algorithms = require("./lib/algorithms.js");

app.get("/", function(req, res) {
    res.render("index", {"categories": algorithms.categories});
});

app.get("/:algorithm", function(req, res) {
    var algorithm = algorithms.algorithms[req.params.algorithm];
    if (algorithm) {
        var fs = require("fs");
        algorithm.code = fs.readFileSync("public/js/" + algorithm.category
                                         + "/" + algorithm.file);
        res.render(algorithm.category, {
            currentAlgorithm: algorithm,
            "categories": algorithms.categories
        });
    } else
        res.send(404);
});

app.listen(3000);
