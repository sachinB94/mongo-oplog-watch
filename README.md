# mongo-oplog-watch

*Watch for changes in mongoDB using oplog. This is basically a wrapper for mongo-oplog package, with better formatted results*

## Installation

npm install --save mongo-oplog-watch

## Usage

```js
var mongoWatch = require('mongo-oplog-watch');
```

- Register a watcher

```js
var watcher = mongoWatch('/mongo/uri', mongoOptions);
```

- Now, watcher exposes following events

```js
watcher.on('insert', function(doc) {
  doc = {
    db: 'db name',
    collection: 'collection name',
    object: {
      // inserted object
    }
  }
});
 
watcher.on('update', function (doc) {
  doc = {
    db: 'db name',
    collection: 'collection name',
    query: {
      _id: 'Object Id'
    },
    object: {
      set: {
        field1: 'updated value',
        field2: 'updated value'
        // ...
      }
    }
  }
});
 
watcher.on('delete', function (doc) {
  doc = {
    db: 'db name',
    collection: 'collection name',
    object: {
      _id: 'deleted Id'
    }
  }
});
 
watcher.on('error', function (error) {
  console.log('error', error);
});
 
watcher.on('end', function () {
  console.log('Stream ended');
});
```

- Other useful methods

```js
watcher.stop(function() {
  // Tailing stopped
});
```
  - Stop tailing and disconnect from server

```js
watcher.destroy(function() {
  // Destroyed
});
```
  - Destroy the mongo-oplog object by stop tailing and disconnecting from server

```js
watcher.pause();
```
  - Pause oplog events

```js
watcher.resume();
```
  - Resume oplog events