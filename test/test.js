// is Node.js
if (typeof module !== 'undefined' && module.exports) {
  var AsyncTaskQueue = require('../async-task-queue');
  var assert = require('chai').assert;
} else {
  var assert = chai.assert;
}

describe('Async task Queue test', function(){
  it('shoud be run all Task', function(done){
    var numbers = [1,2,3];
    var expectSum = 6;
    var sum = 0;
    var queue = AsyncTaskQueue();
    numbers.forEach(function(num){
      queue.enqueue(function (next){
        sum += num;
        next();
        if (sum === expectSum) done();
      });
    });
  });

  it('shoud be run all Task with new keyword', function(done){
    var numbers = [1,2,3];
    var expectSum = 6;
    var sum = 0;
    var queue = new AsyncTaskQueue();
    numbers.forEach(function(num){
      queue.enqueue(function (next){
        sum += num;
        next();
        if (sum === expectSum) done();
      });
    });
  });

});
