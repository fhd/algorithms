module("utilities");

test("createDrawFunction", function() {
    var context = {
            fillRect: function() {}
        },
        canvas = {
            getContext: function() {
                return context;
            }
        },
        mock = sinon.mock(context);

    mock.expects("fillRect").once();

    createDrawFunction(canvas, function(context, width, height) {
        context.fillRect();
    })();

    mock.verify();
});
