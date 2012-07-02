function Stack() {
    var top = 0,
        elements = [];

    this.stackEmpty = function() {
        return (top === 0);
    };

    this.push = function(e) {
        elements[++top] = e;
    };

    this.pop = function() {
        return (this.stackEmpty()) ? null : elements[top--];
    };
}
