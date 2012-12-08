var componentsPath = '../components/';

require.config({
  baseUrl: '.',
  deps: ['aura/main'],
  paths: {
    aura:         '../../src/aura',
    components:   componentsPath,
    backbone:     componentsPath + 'backbone/backbone',
    localstorage: componentsPath + 'backbone.localStorage/backbone.localStorage',
    extensions:   '../extensions',
    widgets:      '../../widgets'
  },
  shim: {
    'backbone':     { exports: 'Backbone' },
    'localstorage': { exports: 'Backbone.LocalStorage', deps: ['backbone'] }
  }
});

var App;
require(['aura/main'], function(Aura) {
  App = new Aura({}, function() {
    App.core.start('#issues');
  });
});


// require(['aura/main'], function(Aura) {
//   new Aura({
//     extensions: {
//       standbox: ['extensions/store']
//     }
//   }, function(App) {
//     console.warn("Callback", App);
//     // App.core.start();
//   });
// });
