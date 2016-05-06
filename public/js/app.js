/*
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', ['ui.router']);

todomvc.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");

  //
  // Now set up the states
  $stateProvider
    .state('list', {
      url: "/",
      templateUrl: "List.html"
    });
  $stateProvider
    .state('signup', {
      url: "/signup",
      templateUrl: "register.html"
    });
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "login.html"
    });
});