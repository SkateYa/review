function add() {
    var total = [...arguments].reduce((a, b) => a + b);

    function sum() {
        total += [...arguments].reduce((a, b) => a + b);;
        return sum;
    }
    //隐式转换
    sum.toString = function () {
        return total;
    }
    return sum;
}