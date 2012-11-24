define('hull_core', ['hull_base', 'hull_sandbox'], function(base, sandbox) {

  var core = Object.create(base);

  function decamelize(camelCase, delimiter) {
    delimiter = (delimiter === undefined) ? '_' : delimiter;
    return camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
  }

  function parseWidgets(el) {
    var widgets = [],
        selector = "[data-widget]";
    core.dom.find(selector, el).each(function() {
      var options = { el: this };
      core.util.each(core.dom.data(this), function(k,v) {
        options[decamelize(k)] = v;
      });
      widgets.push({ channel: options.widget, options: options });
    });
    return widgets;
  };

  var seq = 0;

  function loadWidget(widget) {
    var file = decamelize(widget.channel),
        dfd  = core.data.deferred()
        requireConfig = core.util.extend({}, require.s.contexts._.config);
        widgetPath = 'widgets/' + file,
        sandboxId  = "sandbox$" + seq++;

    var widgetSandbox = sandbox.create(core);
    widgetSandbox._id = sandboxId;

    var sandboxMap = {};
    sandboxMap[widgetPath] = {
      sandbox: sandboxId  
    }

    
    define(sandboxId, widgetSandbox);

    var req = require.config({
      context: sandboxId,
      map: sandboxMap
    });

    req([widgetPath + '/main'], function(main) {
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

  core.start = function(el) {
    var widgets = parseWidgets(el || 'body');
    var promises = [];
    
    core.util.each(widgets, function(i, widget) {
      promises.push(loadWidget(widget));
    });

    var started = core.data.when.apply(undefined, promises)
    started.done(function() {
      console.warn("All widgets started ok ...", arguments);
    });

    return started;
  };  

  return core;

});