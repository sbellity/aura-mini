define(function() {
  return {
    extend: function(sandbox, core) {
      
      sandbox.on = function(event, subscriber, callback, context) {
        console.warn("On event: ", arguments);
      };

      sandbox.emit = function() {
        console.warn("Emit event: ", arguments);
      };
      
      return sandbox;
    }
  };
});