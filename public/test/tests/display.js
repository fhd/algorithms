module("display");

test("init", 3, function() {
    currentAlgorithmFile = "";
    $("body").append($("<canvas/>").attr("id", "canvas"));

    var draw = sinon.spy();
    prettyPrint = sinon.spy();

    sinon.stub(window, "setInterval");

    display.init(draw);

    ok(prettyPrint.called, "Google Prettify should be activated.");
    ok(setInterval.called, "The draw interval should be set up.");
    setInterval.args[0][0]();
    ok(draw.called, "The draw function should invoked.");

    setInterval.restore();
    $("#canvas").remove();
});
