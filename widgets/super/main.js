define(['sandbox'], function(sandbox) {
  return function(options) {
    sandbox.dom.find(options.el).html("Super Simple !");
    return sandbox;
  };
});