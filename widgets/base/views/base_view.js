define(['sandbox'], function(sandbox) {
  return sandbox.mvc.View.extend(sandbox).extend({
    render: function() {
      this.dom.find(this.el).html('OLA i am a Base Widget...' +  this._id + " : " + this.cid);
      return this;
    }
  });
});