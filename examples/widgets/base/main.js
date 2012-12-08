define(['sandbox', './views/base_view'], function(sandbox, BaseView) {

  return function(options) {
    return new BaseView(options).render();
  };
});