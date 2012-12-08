define(['../base', '../sandbox', 'text', 'i18n', 'hbs'], function(base, sandbox, text, i18n, hbs) {

  var seq  = 0;
  var sandboxes = {};

  function decamelize(camelCase, delimiter) {
    delimiter = (delimiter === undefined) ? '_' : delimiter;
    return camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
  }

  function parseWidgets(el) {
    var loc, widgets = [],
        selector = "[data-widget]";
    base.dom.find(selector, el).each(function() {
      var options = { el: this, element: this, require: {} }, widgetName, widgetLocation;

      base.util.each(base.dom.data(this), function(k,v) {
        if (k.toLowerCase() !== 'widget') {
          options[decamelize(k)] = v;  
        } else {
          var ref = v.split("@");
          widgetName      = decamelize(ref[0]);
          widgetLocation  = ref[1];
        }
      });

      options.channel = widgetName;

      if (widgetLocation) {
        loc = "http://" + widgetLocation + "/" + options.channel;
      } else {
        loc = "../widgets/" + options.channel;
      }

      options.require           = options.require || {};
      options.require.packages  = options.require.packages || [];
      options.require.packages.push({ name: options.channel, location: loc });

      widgets.push({ channel: options.channel, options: options });
    });
    return widgets;
  }

  function loadWidget(widget) {
    var channel       = widget.channel,
        dfd           = base.data.deferred(),
        sandboxId     = channel + "#" + seq++,
        widgetPath    = 'widgets/' + channel,
        requireConfig = base.util.extend(true, { context: sandboxId, map: {} }, widget.options.require);

    var widgetSandbox = sandbox.create(this, channel);

    widgetSandbox.id  = sandboxId;
    widgetSandbox.el  = widget.options.el;

    requireConfig.map[channel] = {
      sandbox: sandboxId  
    };
   
    define(sandboxId, widgetSandbox);

    define('hbs', text);
    define('text', text);
    define('i18n', i18n);

    console.warn("RequireConfig for widget: ", channel, widget, requireConfig);

    var req = require.config(requireConfig);

    req([channel], function(main) {
      try {
        dfd.resolve({ channel: channel, widget: main(widget.options), sandbox: widgetSandbox, children: [] });
      } catch(e) {
        console.warn("Error loading widget", widget, e);
        dfd.reject();
      }
    }, function() {
      console.warn("Error requiring widget: ", widget, arguments);
      dfd.reject();
    });

    dfd.then(function(ctx) {
      // Register the sandbox
      sandboxes[channel] = sandboxes[channel] || {};
      sandboxes[channel][sandboxId] = ctx;
    });

    return dfd;
  }


  function bootWidget(widget) {
    
  }


  return {

    extend: function(core) {

      core.start = function(el) {
        var self      = this;
        var widgets   = parseWidgets(el || 'body');
        var promises  = [];
        
        if (widgets.length === 0) {
          return;
        }

        base.util.each(widgets, function(i, widget) {
          promises.push(loadWidget.call(core, widget));
        });

        console.log("start batch: ", widgets);

        var started = base.data.when.apply(this, promises);

        started.done(function() {
          console.warn("All widgets started ok ...", self, arguments);
          var children = Array.prototype.slice.call(arguments);
          self.children = (self.children || []).concat(children);
          core.util.each(children, function(i, child) {
            console.warn("Child: ", child);
            child.sandbox.start(child.sandbox.el);
          });
        });

        return started;
      };

      core.start.sandboxes = sandboxes;

      return core;
    }  
  };
});