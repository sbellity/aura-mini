define(['eventemitter'], function(EventEmitter) {
  return {
    extend: function(core) {
      
      var pubsub = {};

      core.createPubSub = function(subscriber) {
        return new EventEmitter({
          wildcard: true,
          delimiter: '.'
        });
      };
      
      core.getPubsub = function(subscriber) {
        pubsub[subscriber] = pubsub[subscriber] || core.createPubSub(subscriber);
        return pubsub[subscriber];
      };
      
      return core;
    }
  };
});