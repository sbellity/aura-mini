define(function() {

  require.config({
    
    baseUrl: "src",

    deps: ['aura'],
    
    paths: {

      // require plugins
      text:               './vendor/require/text',

      // Vendors
      jquery:             './vendor/jquery',
      backbone:           './vendor/backbone',
      underscore:         './vendor/underscore',
      eventemitter:       './vendor/eventemitter2',

      // Require extensions
      text:               './vendor/require/text',
      i18n:               './vendor/require/i18n',

      // Local Widgets
      widgets:            '../../widgets'
    },

    packages: [
      { name: 'aura', location: 'aura' }
    ],
    
    shim: {
      jquery:     { exports: "$" },
      backbone:   { exports: "Backbone", deps: [ 'underscore', 'jquery' ] },
      underscore: { exports: "_" }
    }
  });

});
