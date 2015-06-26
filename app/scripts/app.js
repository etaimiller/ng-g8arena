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
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ipCookie',
    'ui.router',
    'ng-token-auth',
    'formly',
    'formlyBootstrap'
  ])
  .constant('g8arenaConfig', {
    apiUrl: 'http://localhost:3000'
  })
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$authProvider',
    'g8arenaConfig',
    'formlyConfigProvider',
    function($stateProvider, $urlRouterProvider, $authProvider, g8arenaConfig, formlyConfigProvider) {
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
          requireAuth: true,
          resolve: {
            teamsWithUserPromise: ['Team', function(Team) {
              return Team.getAllTeams();
            }]
          }
        })
        .state('match.index', {
          url: '/index',
          templateUrl: 'scripts/match/_match.index.html',
          controller: 'MatchCtrl',
          requireAuth: true,
          resolve: {
            allMatchesPromise: ['Match', function(Match) {
              return Match.getAllMatches();
            }]
          }
        })
        .state('teams', {
          url: '/teams',
          abstract: true,
          template: '<ui-view/>'
        })
        .state('teams.index', {
          url: '/index',
          templateUrl: 'scripts/teams/_teams.index.html',
          controller: 'TeamCtrl',
          requireAuth: true,
          resolve: {
            teamsWithUserPromise: ['Team', function(Team) {
              return Team.getAllUsers()
                .then(function(){
                  Team.getAllTeams();
                });
            }]
          }
        });

      $urlRouterProvider.otherwise('home');

      $authProvider.configure({
        apiUrl: g8arenaConfig.apiUrl
      });

      // formlyConfigProvider.setType({
      //   name: 'input'
      //   // templateUrl: 'scripts/match/_match.new.html'
      // });
    }
  ])
  .run([
    '$rootScope',
    '$state',
    '$auth',
    function($rootScope, $state, $auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log("before if");
        if(toState.requireAuth && typeof $auth.user.signedIn === 'undefined') {
          console.log("after if");
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
