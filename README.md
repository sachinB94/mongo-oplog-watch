# mongo-oplog-watch

*Watch for changes in mongoDB using oplog. This is basically a wrapper for mongo-oplog package, with better formatted results*

## Installation

npm install --save mongo-oplog-watch

## Mongo configuration

Configure MongoDB for ac active oplog:

Start MongoDB with:

``` bash
$ mongod --replSet test
```

Start a `mongo` shell and configure mongo as follows:

```bash
> var config = {_id: "test", members: [{_id: 0, host: "127.0.0.1:27017"}]}
> rs.initiate(config)
```

Once configuration is initiated then you can use the package in your application.

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

  - Stop tailing and disconnect from server
  ```js
  watcher.stop(function() {
    // Tailing stopped
  });
  ```
  

  - Destroy the mongo-oplog object by stop tailing and disconnecting from server
  ```js
  watcher.destroy(function() {
    // Destroyed
  });
  ```


  - Pause oplog events
  ```js
  watcher.pause();
  ```


  - Resume oplog events
  ```js
  watcher.resume();
  ```