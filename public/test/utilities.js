module("utilities");

test("createDrawFunction", 1, function() {
    var mockContextUsed = false,
        mockCanvas = {
            width: 100,
            height: 100,
            getContext: function() {
                return {
                    fillRect: function() {
                        mockContextUsed = true;
                    }
                };
            }
        };

    createDrawFunction(mockCanvas, function(context, width, height) {
        context.fillRect();
    })();

    ok(mockContextUsed,
       "The draw function should use the context of the supplied canvas.");
});
