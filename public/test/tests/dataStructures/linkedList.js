module("dataStructures/linkedList");

test("insert, search", 2, function() {
    var list = new LinkedList(),
        first = {key: 1},
        second = {key: 2};
    list.insert(first);
    list.insert(second);
    equal(list.search(1).key, first.key);
    equal(list.search(2).key, second.key);
});

test("delete", 2, function() {
    var list = new LinkedList();
    list.insert({key: 1});
    list.insert({key: 2});
    list.delete(list.search(1));
    deepEqual(list.toArray(), [2]);
    list.delete(list.search(2));
    deepEqual(list.toArray(), []);
});

test("toArray", 1, function() {
    var list = new LinkedList();
    list.insert({key: 1});
    list.insert({key: 2});
    deepEqual(list.toArray(), [1, 2]);
});
