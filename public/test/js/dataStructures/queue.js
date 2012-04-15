module("dataStructures/queue");

test("enqueue,dequeue", 3, function() {
    var queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    equal(queue.dequeue(), 1);
    equal(queue.dequeue(), 2);
    equal(queue.dequeue(), null);
});
