module.exports = function(ko, $, window) {
  var router = require('./router')($, window);
  var timeago = require('timeago');
  var marked = require('marked');
  var SERVICE_URL = 'http://localhost:3000';

  return function() {
    var self = this;

    self.currentView = ko.observable();
    self.isLoading = ko.observable(false);

    self.jobs = ko.observableArray();
    self.job = ko.observable();

    self.getURL = function(id) {
      return '/#/jobs/' + id;
    };

    self.parseDate = function(date) {
      return new Date(date)
    };

    self.timeAgo = function(date) {
      return timeago(self.parseDate(date));
    };

    self.makeHtml = function(markdown) {
      return marked(markdown);
    };

    /* Routes */
    router(['/$', '/jobs$'], function(parsedUrl) {
      self.isLoading(true);
      $.get(SERVICE_URL + '/jobs', function(data) {
        self.currentView('jobs');
        self.jobs(data.result);
        self.isLoading(false);
      });
    });

    router('/jobs/(.+)$', function(parsedUrl) {
      self.isLoading(true);
      $.get(SERVICE_URL + '/jobs/' + parsedUrl[1], function(data) {
        self.currentView('job');
        self.job(data);
        self.isLoading(false);
      });
    });
  };
};
