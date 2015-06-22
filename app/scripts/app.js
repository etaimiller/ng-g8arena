'use strict';

/**
 * @ngdoc overview
 * @name ngG8arenaApp
 * @description
 * # ngG8arenaApp
 *
 * Main module of the application.
 */
angular
  .module('ngG8arenaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'scripts/home/_home.html',
          controller: 'HomeCtrl'
        });

      $urlRouterProvider.otherwise('home');
    }
  ]);
