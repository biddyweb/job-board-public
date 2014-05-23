var ko = window.ko = require('knockout');
var $ = window.$ = require('jquery');
var ViewModel = require('./view-model')(ko, $, window);

var viewModel = window.viewModel = new ViewModel();
ko.applyBindings(viewModel);