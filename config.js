define(function() {

  require.config({
    
    baseUrl: "/",

    deps: ['aura'],
    
    paths: {

      // require plugins
      text:               './vendor/require/text',

      // Vendors
      jquery:             './vendor/jquery',
      backbone:           './vendor/backbone',
      underscore:         './vendor/underscore',
      eventemitter:       './vendor/eventemitter2',
      widgets:            './widgets'
    },

    config: {
      'aura/core': {
        extensions: ['aura/core/pubsub', 'aura/core/widgets']
      },
      'aura/sandbox': {
        extensions: ['mvc', 'pubsub', 'store']
      }
    },

    packages: [
      { name: 'aura', location: './lib/aura' }
    ],
    
    shim: {
      jquery:     { exports: "$" },
      backbone:   { exports: "Backbone", deps: [ 'underscore', 'jquery' ] },
      underscore: { exports: "_" }
    }
  });

});
