function LinkedList() {
    var head = null;

    this.insert = function(x) {
        x.next = head;
        if (head !== null)
            head.prev = x;
        head = x;
        x.prev = null;
    };

    this.delete = function(x) {
        if (x.prev !== null)
            x.prev.next = x.next;
        else
            head = x.next;
        if (x.next !== null)
            x.next.prev = x.prev;
    }

    this.search = function(k) {
        var x = head;
        while (x !== null && x.key !== k)
            x = x.next;
        return x;
    }

    /*
     * This is a utility function for displaying the list.
     * It is not part of the original data structure.
     */
    this.toArray = function() {
        var array = [],
            x = head;
        while (x !== null) {
            array.push(x.key);
            x = x.next;
        }
        return array.reverse();
    }
}
