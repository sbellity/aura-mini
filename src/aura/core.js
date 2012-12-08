define([
  './base', 
  './core/pubsub',
  './core/widgets'
], function(base) {

  var core = Object.create(base);

  var extensions = Array.prototype.slice.call(arguments, 1);
  
  core.util.each(extensions, function(i, ext) {
    core = ext.extend(core);
  });

  return core;
});