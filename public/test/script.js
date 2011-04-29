module("script");

test("Array.shuffle", function() {
    expect(1);
    var array = [1, 2, 3, 4, 5];
    var shuffledArray = array.slice();
    shuffledArray.shuffle();
    notDeepEqual(array, shuffledArray);
});

test("Painter", function() {
    expect(1);

    var mockContextUsed = false,
        mockContext = {
            clearRect: function() {
                mockContextUsed = true;
            },
            fillRect: function() {
                mockContextUsed = true;
            }
        },
        mockCanvas = {
            width: 100,
            height: 100,
            getContext: function() {
                return mockContext;
            }
        };

    Painter.init(mockCanvas);
    Painter.draw();
    ok(mockContextUsed,
       "The Painter should use the context of the supplied canvas.");
});
