(function () {
  "use strict";

  var AsyncTaskQueue = function () { return new TaskQueue(); };

  // export for node js
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = AsyncTaskQueue;
    }
    exports.AsyncTaskQueue = AsyncTaskQueue;
  } else {
    this.AsyncTaskQueue = AsyncTaskQueue;
  }

  var TaskQueue = (function () {
    function TaskQueue() {
      this.queue = [];
      this.isExecuting = false;
    }

    // enqueue job. run immediately.
    TaskQueue.prototype.enqueue = function (job) {
      // enqueue.
      this.queue.push(job);
      // call execute.
      dequeueAndExecute(this);
    };

    // Dequeue and execute job.
    function dequeueAndExecute (self) {
      if (self.isExecuting) return;

      // Dequeue Job.
      var job = self.queue.shift();
      if (!job) return;

      //Execute Job.
      self.isExecuting = true;

      // Pass next job execute callback.
      job(function() {
        self.isExecuting = false;
        dequeueAndExecute(self);
      });
    }

    return TaskQueue;
  })();

}.call(this));
