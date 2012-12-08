define(['module', 'eventemitter'], function(module, EventEmitter) {

  var emitterConfig = module.config().emitter || {},
      pubsubs = {}, permissions = {}, rules = {};


  function createPubsub(subscriber) {
    return new EventEmitter(emitterConfig);
  }
  
  function getPubsub(subscriber) {
    return pubsubs[subscriber] = pubsubs[subscriber] || createPubsub(subscriber);
  }


  function getPermissions(subscriber) {
    getPubsub(subscriber);
    return permissions.rules(subscriber);
  }

  function hasPermission(subscriber, event) {
    var eventPerm, pubsub = getPubsub(subscriber);
    eventPerm = event = typeof event === 'string' ? event.split('.') : event.slice();
    eventPerm.unshift('perm');  // The 'perm' namespace to store an imprint of a module's permissions
                                // inside of pubsub. This prevents unneeded duplication of code while
                                // giving aura permissions * and ** support.

    return (pubsub.listeners(eventPerm).length > 0) ? true : false;
  }


  return {
    
    extend: function(core) {

      emitterConfig = core.util.extend(true, emitterConfig, { wildcard: true, delimeter: '.' });

      core.on = function(event, subscriber, callback, context) {

        if (event === undefined || callback === undefined || context === undefined) {
          throw new Error('Event, callback, and context must be defined');
        }
        if (typeof event !== 'string') {
          throw new Error('Event must be a string');
        }
        if (typeof subscriber !== 'string') {
          throw new Error('Subscriber must be a string');
        }
        if (typeof callback !== 'function') {
          throw new Error('Callback must be a function');
        }

        if (!hasPermission(subscriber, event)) { 
          console.warn("No permission set for ", subscriber, event);
          return; 
        }

        var pubsub = getPubsub(subscriber);

        if (event === "*") {
          pubsub.onAny(callback.bind(context));
        } else {
          pubsub.on(event, callback.bind(context));
        }
      };

      var isWidgetLoading = false;
      var emitQueue = [];

      core.emit = function(event) {
        if (event === undefined) {
          throw new Error('Channel must be defined');
        }
        if ((typeof event !== 'string') && (typeof event !== 'array')) {
          throw new Error('event must be a string or a string');
        }
        if (isWidgetLoading) { // Catch emit event!
          emitQueue.push(arguments);
          return false;
        } else {
          var args = [].slice.call(arguments, 1);
          for (var key in pubsubs) {
            try {
              var pubsub = pubsubs[key];
              pubsub.emit(event, args);
            } catch (e) {
              console.error(e.message);
            }
          }
        }

        return true;
      };

      return core;
    }
  };
});