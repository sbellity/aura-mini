define('hull_widget', function() {

  var WidgetBase = {
    initialize: function() {
      console.warn("Base Widget init with options: ", arguments);
    },
    render: function() {
      this.dom.find(this.el).html('A Super Widget !');
    }
  };

  var Widget = {};

  
  Widget.create = function(sandbox, options) {
    var Widget = sandbox.mvc.View.extend(WidgetBase).extend(sandbox);
    return new Widget(options);
  }

  console.warn("WTF ??", Widget);

  return Widget;
});