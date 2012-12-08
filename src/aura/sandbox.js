define([
  './sandbox/mvc',
  './sandbox/pubsub',
  './sandbox/store'
], function() {
  
  var extensions = Array.prototype.slice.call(arguments);
  
  return {
    create: function(core, channel) {

      var sandbox = { channel: channel };

      // Expose 'public' core API
      core.util.each(['log', 'template', 'util', 'data', 'dom'], function(i,m) {
        sandbox[m] = core[m];
      });

      sandbox.log = function() {
        console.log.apply(undefined, arguments);
      };

      // Load Sandbox extensions...
      core.util.each(extensions, function(i, ext) {
        sandbox = ext.extend(sandbox, core);
      });

      sandbox.start = function(el) {
        core.start.call(sandbox, el);
      };

      sandbox.start.sandboxes = core.start.sandboxes;

      return sandbox;
    }
  };

});
