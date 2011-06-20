module("dataStructures/queue");

test("enqueue,dequeue", function() {
    expect(3);
    var queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    equal(queue.dequeue(), 1);
    equal(queue.dequeue(), 2);
    equal(queue.dequeue(), null);
});
