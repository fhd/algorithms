module("dataStructures/stack");

test("empty", function() {
    expect(2);
    var stack = new Stack();
    ok(stack.stackEmpty(), "The stack should be empty initially.");
    stack.push(1);
    ok(!stack.stackEmpty(), "The stack shouldn't be empty after a push");
});

test("push,pop", function() {
    expect(3);
    var stack = new Stack();
    stack.push(1);
    stack.push(2);
    equal(stack.pop(), 2);
    equal(stack.pop(), 1);
    equal(stack.pop(), null);
});
