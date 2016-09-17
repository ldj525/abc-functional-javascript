if (typeof global == 'object') {
    var Q = require('./../example/js/q.js');
}

var time = 10;
var length = 999;
var Promise = Q.Promise;
var start = Date.now();
function task(i, cb) {
    //console.log(i);
    setTimeout(function() {
        cb(i);
    }, time);
}

var func = function(i) {
    return new Promise(function(rs) {
        task(i, function(i) {
            rs(i);
        });
    });
};
var promise = func(1);
for (var k = 0; k < length; k++) {
    promise = promise.then(function(i) {
        return func(i);
    });
}
promise.then(function() {
    console.log('Q: ' + (Date.now() - start - (time * (length+1))) + 'ms');
});