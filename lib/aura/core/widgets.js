define(['../base', '../sandbox'], function(base, sandbox) {

  var seq = 0;


  function decamelize(camelCase, delimiter) {
    delimiter = (delimiter === undefined) ? '_' : delimiter;
    return camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
  }

  function parseWidgets(el) {
    var widgets = [],
        selector = "[data-widget]";
    base.dom.find(selector, el).each(function() {
      var options = { el: this, element: this };
      base.util.each(base.dom.data(this), function(k,v) {
        options[decamelize(k)] = v;
      });
      widgets.push({ channel: options.widget, options: options });
    });
    return widgets;
  }

  function loadWidget(widget) {
    var file          = decamelize(widget.channel),
        dfd           = base.data.deferred(),
        sandboxId     = "sandbox$" + seq++, 
        requireConfig = { context: sandboxId, map: {} },
        widgetSource,
        widgetPath;

    if (/\:/.test(file)) {
      requireConfig.baseUrl = "http://" + file.split(':')[0];
      widgetPath = 'widgets/' + file.split(':')[1];
      console.warn('bah alors: ', file, requireConfig.baseUrl);

      requireConfig.paths = {
        text: 'extensions/backbone/lib/text'
      };

    } else {
      widgetPath = 'widgets/' + file;
    }

    var widgetSandbox = sandbox.create(this);
    widgetSandbox._id = sandboxId;

    requireConfig.map[widgetPath] = {
      sandbox: sandboxId  
    };
    
    define(sandboxId, widgetSandbox);

    console.warn("requireConfig", requireConfig);
    var req = require.config(requireConfig);

    req([widgetPath + "/main"], function(main) {
      try {
        dfd.resolve(main(widget.options));
      } catch(e) {
        console.warn("Error loading widget", widget, e);
        dfd.reject();
      }
    }, function() {
      console.warn("Error requiring widget: ", widget, arguments);
      dfd.reject();
    });

    return dfd;
  }


  function bootWidget(widget) {
    
  }


  return {

    extend: function(core) {

      core.start = function(el) {
        var widgets = parseWidgets(el || 'body');
        var promises = [];
        
        base.util.each(widgets, function(i, widget) {
          promises.push(loadWidget.call(core, widget));
        });

        var started = base.data.when.apply(undefined, promises);

        started.done(function() {
          console.warn("All widgets started ok ...", arguments);
        });

        return started;
      };  

      return core;
    }  
  };
});