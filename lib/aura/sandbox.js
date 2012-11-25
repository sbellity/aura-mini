define([
  './sandbox/mvc',
  './sandbox/pubsub',
  './sandbox/store'
], function() {
  
  var extensions = Array.prototype.slice.call(arguments);
  
  return {
    create: function(core) {
      var sandbox = {};
      
      // Expose base core API
      core.util.each(['log', 'template', 'util', 'data', 'dom'], function(i,m) {
        sandbox[m] = core[m];
      });

      sandbox.log = function() {
        console.log.apply(undefined, arguments);
      };

      // Load Sandbox extensions...
      core.util.each(extensions, function(i, ext) {
        console.warn("Sandbox ext: ", sandbox, ext);
        sandbox = ext.extend(sandbox, core);
      });

      sandbox.start = function(el) {
        core.start(el);
      };

      console.warn("Sandbox api ", sandbox);

      return sandbox;
    }
  };

});
