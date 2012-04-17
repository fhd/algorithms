var sorting = {};

(function(sorting) {
    var array = [], i;

    function draw(context, width, height) {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "12px sans";
        context.textBaseline = "top";
        $.each(array, function(index, value) {
            var barWidth = 5;
            context.fillRect(index * barWidth * 2 + barWidth,
                             ((array.length + 1) - value) * barWidth,
                             barWidth, barWidth * value);
        });
    };

    for (i = 0; i < 30; i++)
        array[i] = i + 1;

    Array.prototype.shuffle = function() {
        var s = [];
        while (this.length)
            s.push(this.splice(Math.random() * this.length, 1));
        while (s.length)
            this.push(s.pop());
        return this;
    };

    sorting.init = function(stack) {
        if (typeof currentAlgorithmFile != "undefined") {
            prettyPrint(); // Prettify

            array.shuffle();
            $("#shuffle").click(function() {
                array.shuffle();
            });

            $("#sort").click(function() {
                var controls = $("#algorithms, #shuffle, #sort"),
                    worker = new Worker("js/sorting/worker.js");
                controls.attr("disabled", "true");
                worker.onmessage = function(event) {
                    var data = event.data;
                    array = data.array;
                    if (data.finished)
                        controls.removeAttr("disabled");
                };
                worker.postMessage({
                    file: currentAlgorithmFile,
                    functionName: currentAlgorithmFunction,
                    "array": array
                });
            });

            setInterval(utils.createDrawFunction($("#canvas")[0], draw), 10);
        }
    };
})(sorting);
