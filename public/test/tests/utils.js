module("utils");

test("createDrawFunction", 1, function() {
    var context = testUtils.uniqueObject(),
        canvas = {
            getContext: sinon.stub().returns(context)
        },
        f = sinon.spy();

    utils.createDrawFunction(canvas, f)();

    ok(f.calledWith(context),
       "The draw function should use the context of the supplied canvas.");
});
