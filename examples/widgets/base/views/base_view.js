define(['sandbox'], function(sandbox) {
  return sandbox.mvc.View(sandbox).extend({
    render: function() {
      this.dom.find(this.el).html('OLA i am a Base Widget...' +  this.id + " : " + this.cid);
      return this;
    }
  });
});