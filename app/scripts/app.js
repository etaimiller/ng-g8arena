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
    'ui.router',
    'ng-token-auth'
  ])
  .constant('g8arenaConfig', {
    apiUrl: 'http://localhost:3000'
  })
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$authProvider',
    'g8arenaConfig',
    function($stateProvider, $urlRouterProvider, $authProvider, g8arenaConfig) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'scripts/home/_home.html',
          controller: 'HomeCtrl',
          requireAuth: false
        })
        .state('login', {
          url: '/login',
          templateUrl: 'scripts/auth/_login.html',
          controller: 'AuthCtrl',
          requireAuth: false
        })
        .state('register', {
          url: '/register',
          templateUrl: 'scripts/auth/_register.html',
          controller: 'AuthCtrl',
          requireAuth: false
        })
        .state('profile', {
          url: '/profile',
          abstract: true,
          template: '<ui-view/>'
        })
        .state('profile.show', {
          url: '/show',
          templateUrl: 'scripts/profile/_profile.show.html',
          controller: 'ProfileCtrl',
          requireAuth: true
        })
        .state('match', {
          url: '/match',
          abstract: true,
          template: '<ui-view/>'
        })
        .state('match.new', {
          url: '/new',
          templateUrl: 'scripts/match/_match.new.html',
          controller: 'MatchCtrl',
          requireAuth: true
        })
        .state('match.index', {
          url: '/index',
          templateUrl: 'scripts/match/_match.index.html',
          controller: 'MatchCtrl',
          requireAuth: true
        });

      $urlRouterProvider.otherwise('home');

      $authProvider.configure({
        apiUrl: g8arenaConfig.apiUrl
      });
    }
  ])
  .run([
    '$rootScope',
    '$state',
    '$auth',
    function($rootScope, $state, $auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.requireAuth && typeof $auth.user.signedIn === 'undefined') {
          $auth.validateUser().then(function() {
            console.log('User validated:');
            console.log($auth.user);
          }, function(){
            console.log('Could not validate user:');
            console.log($auth.user);
            event.preventDefault();
            $state.go('login');
          });
        }
      });
    }
  ]);
