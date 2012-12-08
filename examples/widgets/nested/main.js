define(['sandbox', 'text!./templates/nested.html'], function(sandbox, nested) {
  return function(options) {
    console.warn("Nested Widget...");
    sandbox.dom.find(options.el).html(nested);
    // sandbox.start(options.el);
  };
});