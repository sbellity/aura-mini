define(function() {
  function Aura(config, callback) {

    console.warn("Aura init !");

    var self = this;

    config = config || {};
    config.require = config.require || require.s.contexts._.config;

    this.context = config.require.context || "_";

    config.require.paths = config.require.paths || {};

    var componentsBasePath = config.require.paths.components;
    if (componentsBasePath[componentsBasePath.length - 1] !== "/") {
      componentsBasePath += "/";
    }

    var componentsPaths = {
      jquery:         "jquery/jquery",
      underscore:     "underscore/underscore",
      text:           "requirejs-text/text",
      i18n:           "requirejs-i18n/i18n",
      hbs:            "require-handlebars-plugin/hbs",
      handlebars:     "require-handlebars-plugin/Handlebars",
      i18nprecompile: "require-handlebars-plugin/hbs/i18nprecompile",
      json2:          "require-handlebars-plugin/hbs/json2",
      eventemitter:   "eventemitter2/lib/eventemitter2"
    };

    for (var p in componentsPaths) {
      config.require.paths[p] = config.require.paths[p] || componentsBasePath + componentsPaths[p];
    }

    config.require.shim.underscore = { exports: '_' };

    config.require.hbs = {
      templateExtension : 'hbs',
      disableI18n : true
    };

    this.require = require.config(config.require);
    
    this.require(['aura/core'], function(core) {
      self.core = core;
      if (typeof callback === 'function') {
        callback(self);
      }
    });
  }

  return Aura;
});