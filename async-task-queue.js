(function () {
  "use strict";

  this.AsyncTaskQueue = (function () {
    function AsyncTaskQueue() {
      var self = this;
      this.queue = [];
      this.isExecuting = false;

      // Dequeue and execute job.
      this.dequeueAndExecute = function () {
        if (self.isExecuting) return;

        // Dequeue Job.
        var job = self.queue.shift();
        if (!job) return;

        // next job execute function.
        function next(){
          self.isExecuting = false;
          self.dequeueAndExecute();
        }

        //Execute Job.
        self.isExecuting = true;

        // Pass next job execute callback.
        job(next);
      };
    }

    // enqueue job. run immediately.
    AsyncTaskQueue.prototype.enqueue = function (job) {
      // enqueue.
      this.queue.push(job);
      // call execute.
      this.dequeueAndExecute();
    };

    return AsyncTaskQueue;
  })();


}.call(this));
