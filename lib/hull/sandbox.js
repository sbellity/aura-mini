define('hull_sandbox', ['backbone'], function(Backbone) {


  return {
    create: function(core) {
      var sandbox = {};
      sandbox.data  = core.data;
      sandbox.dom   = core.dom;
      sandbox.mvc   = Backbone;
      sandbox.start = function(el) {
        return core.start(el);
      }
      return sandbox;
    }
  }

});
