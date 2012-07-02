var sorting = {};

(function(sorting, display) {
    var array = [];

    for (var i = 0; i < 30; i++)
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
        if (typeof currentAlgorithmFile === "undefined")
            return;

        array.shuffle();
        $("#shuffle").click(function() {
            array.shuffle();
        });

        $("#sort").click(function() {
            var controls = $("#algorithms, #shuffle, #sort");
            controls.attr("disabled", "true");

            var worker = new Worker("js/sorting/worker.js");
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

        function draw(context, width, height) {
            $.each(array, function(index, value) {
                var barWidth = 5;
                context.fillRect(index * barWidth * 2 + barWidth,
                                 ((array.length + 1) - value) * barWidth,
                                 barWidth, barWidth * value);
            });
        };

        display.init(draw);
    };
})(sorting, display);
