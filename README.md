async-task-queue
========

Javascript task queue without any timer (interval, setTimeout ..)

## Installation

```bash
$ npm install async-task-queue
```
```bash
$ bower install async-task-queue
```
## Example
### Before code
```javascript
var ApiClient = (function () {
  function ApiClient() {  }

  ApiClient.prototype.addMessage = function (message, callback) {
    sendHttpRequest({
      method: 'GET',
      url: '/api/AppApi/addMessage/' + message
    }, function (err, result) {
      callback(err, result);
    });
  };

  return ApiClient;
})();
```

### Use async-task-queue code
```javascript
var ApiClient = (function () {
  function ApiClient() {
    this.asyncTaskQueue = new AsyncTaskQueue();
  }

  ApiClient.prototype.addMessage = function (message, callback) {
    this.asyncTaskQueue.enqueue(function (next){
      sendHttpRequest({
        method: 'GET',
        url: '/api/AppApi/addMessage/' + message
      }, function (err, result) {
        callback(err, result);
        next();
      });
    });
  };

  return ApiClient;
})();
```
