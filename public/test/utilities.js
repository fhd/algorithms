module("utilities");

test("createDrawFunction", 1, function() {
    var context = {},
        canvas = {
            getContext: sinon.stub().returns(context)
        },
        f = sinon.spy();

    createDrawFunction(canvas, f)();

    ok(f.calledWith(context),
       "The draw function should use the context of the supplied canvas.");
});
