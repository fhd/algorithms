module("dataStructures/stack");

test("empty", 2, function() {
    var stack = new Stack();
    ok(stack.stackEmpty(), "The stack should be empty initially.");
    stack.push(1);
    ok(!stack.stackEmpty(), "The stack shouldn't be empty after a push");
});

test("push,pop", 3, function() {
    var stack = new Stack();
    stack.push(1);
    stack.push(2);
    equal(stack.pop(), 2);
    equal(stack.pop(), 1);
    equal(stack.pop(), null);
});
