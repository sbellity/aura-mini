define(['vendor/localstorage'], function(Store) {
  return {
    extend: function(sandbox) {
      sandbox.data.Store = Store;
      return sandbox;
    }  
  };
});