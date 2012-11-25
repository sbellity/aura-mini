define(['backbone'], function(Backbone) {
  return {
    extend: function(sandbox) {
      
      sandbox.mvc = {};

      sandbox.mvc.View = function(view) {
        return Backbone.View.extend(view);
      };

      sandbox.mvc.Model = function(model) {
        return Backbone.Model.extend(model);
      };

      sandbox.mvc.Collection = function(collection) {
        return Backbone.Collection.extend(collection);
      };

      sandbox.mvc.Router = function(router) {
        return Backbone.Router.extend(router);
      };

      return sandbox;
    } 
  };
});