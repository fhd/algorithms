function Queue() {
    var head = 0, tail = 0, elements = [];

    this.enqueue = function(e) {
        elements[tail] = e;
        if (tail == elements.length)
            tail = 1;
        else
            tail++;
    };

    this.dequeue = function() {
        var e = elements[head];
        if (head == elements.length)
            head = 1;
        else
            head++;
        return (typeof e == "undefined") ? null : e;
    };
}
