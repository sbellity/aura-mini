define(['sandbox', 'hbs!./templates/issues.hbs'], function(sandbox, issuesTemplate) {

  var defaultRepo = "addyosmani/aura";


  console.warn("TPL: ", issuesTemplate);

  var IssuesCollection = sandbox.mvc.Collection({
    initialize: function(opts) {
      var repo = opts.repo || defaultRepo;
      this.url = 'https://api.github.com/repos/' + repo + '/issues';
    }
  });


  var IssuesView = sandbox.mvc.View({

    initialize: function(options) {
      console.warn("Init Issues View... with options", options);
      this.collection.bind('all', this.render.bind(this));
      this.collection.fetch();
    },

    template: sandbox.template.parse(issuesTemplate),

    render: function() {
      sandbox.dom.find(this.el).html(this.template({ issues: this.collection.toJSON() }));
    }
  });

  return function(options) {
    var Issues = new IssuesCollection({ repo: options.repo });
    new IssuesView({ collection: Issues, el: options.element });
  }
});