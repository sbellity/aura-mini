define(function() {
  return {
    extend: function(sandbox, core) {
      
      sandbox.on = function(fromChannel, callback, context) {
        core.on(fromChannel, sandbox.channel, callback, context || this);
      };

      sandbox.emit = function() {
        console.warn("Emit event: ", arguments);
      };
      
      return sandbox;
    }
  };
});