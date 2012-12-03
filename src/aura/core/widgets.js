define(['../base', '../sandbox', 'text', 'i18n'], function(base, sandbox, text, i18n) {

  var seq = 0;


  function decamelize(camelCase, delimiter) {
    delimiter = (delimiter === undefined) ? '_' : delimiter;
    return camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
  }

  function parseWidgets(el) {
    var widgets = [],
        selector = "[data-widget]";
    base.dom.find(selector, el).each(function() {
      var options = { el: this, element: this, require: {} };

      base.util.each(base.dom.data(this), function(k,v) {
        options[decamelize(k)] = v;
      });

      var ref     = options.widget.split("@"),
          channel = ref[0],
          loc;

      if (ref[1]) {
        loc = "http://" + ref[1] + "/" + channel;
      } else {
        loc = "./widgets/" + channel;
      }

      options.require           = options.require || {};
      options.require.packages  = options.require.packages || [];
      options.require.packages.push({ name: channel, location: loc });

      widgets.push({ channel: channel, options: options });
    });
    return widgets;
  }

  function loadWidget(widget) {
    var channel       = decamelize(widget.channel),
        dfd           = base.data.deferred(),
        sandboxId     = "sandbox$" + seq++,
        requireConfig = base.util.extend(true, { context: sandboxId, map: {} }, widget.options.require),
        widgetPath    = 'widgets/' + channel;

    var widgetSandbox = sandbox.create(this, channel);
    widgetSandbox._id = sandboxId;

    requireConfig.map[channel] = {
      sandbox: sandboxId  
    };
   
    define(sandboxId, widgetSandbox);

    // Hack to have requirejs plugins already loaded here... ?

    define('text', text);
    define('i18n', i18n);

    var req = require.config(requireConfig);

    req([channel], function(main) {
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