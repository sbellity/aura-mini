define(['underscore', 'jquery', './platform'], function(_, $) {

  var base = {};

  base.dom = {
    find: function(selector, context) {
      context = context || document;
      return $(context).find(selector);
    },
    data: function(selector, attribute) {
      return $(selector).data(attribute);
    }
  };

  base.data = {
    deferred: $.Deferred,
    when: $.when
  };

  base.util = {
    each: $.each,
    extend: $.extend
  };

  base.template = {
    parse: _.template
  };

  return base;
});