define(['core'], function(core) {

  // Widgets registry...

  function Widget(options) {
    this.options = options;
    this.initialize.apply(this, this.options);
  }

  Widget.registry = {};

  Widget.load = function(widgetName, options) {
    Widget.registry[widgetName] = Widget.registry[widgetName] || new Widget(name, options);
  };

  var proto = Widget.prototype = {};

  proto.getPath = function() {
    
  };

  proto.initialize = function() {
      
  };

  // Widget Loading


  proto.load = function() {
    if (this._loading) { return this._loading; }
    this._loading = core.data.deferred();
    require([], function(ref) {
      this._loading.resolve();
    }.bind(this), function() {
      this._loading.reject();
    }.bind(this));

    return this._loading;    
  };
  
  proto.unload = function() {
    
  };

  return Widget;
});