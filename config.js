require.config({
  baseUrl: "/aura-mini/",
  deps: ['hull'],
  paths: {
    // Vendors
    jquery:     './vendor/jquery',
    backbone:   './vendor/backbone',
    underscore: './vendor/underscore',
    
    // Hull

    hull:            './lib/hull',
    hull_base:       './lib/hull/base',
    hull_core:       './lib/hull/core',
    hull_sandbox:    './lib/hull/sandbox',
    hull_widget:     './lib/hull/widget',

    widgets:          './widgets'
  },
  
  shim: {
    jquery:     { exports: "$" },
    backbone:   { exports: "Backbone", deps: [ 'underscore', 'jquery' ] },
  },

  callback: function() {
    window.Hull = require('hull');
    Hull.start();
  }
});
