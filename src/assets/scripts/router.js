module.exports = function($, window) {
  
  var routes = [];

  var dispatch = function(url, routes, window) {
    var regExp = null;
    var route = null;

    for(var i = 0; i < routes.length; i++) {
      route = routes[i];
      regExp = new RegExp(route.url);
      if(regExp.test(url)) break;
    }

    if(route && route.controller) {
      $(window.document).trigger("route.beforeController", []);
      route.controller(regExp.exec(url));
      $(window.document).trigger("route.afterController", []);
    }

  };

  $(window).on('hashchange load', function(event) {
    $(this.document).trigger("route.changed", [event]);
    var url = this.location.hash.slice(1) || '/';
    dispatch(url, routes, this);
  });

  return function(url, controllerFunction) {
    var urls = [].concat(url);
    urls.forEach(function(route) {
      routes.push({ url: route, controller: controllerFunction });
    });
  };
};