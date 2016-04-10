var EventEmitter = require('events').EventEmitter;
var watcher = new EventEmitter();
var MongoOplog = require('mongo-oplog');

function mongoWatch(mongoUri, options) {
  var oplog = MongoOplog(mongoUri, options).tail();

  oplog.on('insert', function (data) {
    var out = {};
    out.db = data.ns.substring(0, data.ns.lastIndexOf('.'));
    out.collection = data.ns.substring(data.ns.lastIndexOf('.') + 1);
    out.object = data.o;
    watcher.emit('insert', out);
  });
   
  oplog.on('update', function (data) {
    var out = {};
    out.db = data.ns.substring(0, data.ns.lastIndexOf('.'));
    out.collection = data.ns.substring(data.ns.lastIndexOf('.') + 1);
    out.query = data.o2;
    out.object = {};
    for (var op in data.o) {
      if (op[0] === '$') {
        out.object[op.substring(1)] = data.o[op];
      } else {
        out.object[op] = data.o[op];
      }
    }
    watcher.emit('update', out);
  });
   
  oplog.on('delete', function (data) {
    var out = {};
    out.db = data.ns.substring(0, data.ns.lastIndexOf('.'));
    out.collection = data.ns.substring(data.ns.lastIndexOf('.') + 1);
    out.object = data.o;
    watcher.emit('delete', out);
  });
   
  oplog.on('error', function (error) {
    watcher.emit('error', error);
  });
   
  oplog.on('end', function () {
    watcher.emit('end');
  });
   
  watcher.stop = function(next) {
    oplog.stop(next);
  };

  watcher.destroy = function(next) {
    oplog.destroy(next);
  };

  watcher.pause = function() {
    oplog.ignore = true;
  }

  watcher.resume = function() {
    oplog.ignore = false;
  }
  
  return watcher;
}

module.exports = mongoWatch;
