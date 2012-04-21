var testUtils = {};

(function(testUtils) {
    var id = 0;

    function uniqueId() {
        return id++;
    }

    testUtils.uniqueObject = function() {
        return {
            __id: uniqueId()
        };
    };
})(testUtils);
