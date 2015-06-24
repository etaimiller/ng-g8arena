'use strict';

angular.module('ngG8arenaApp')

.factory('Team', ['$http','g8arenaConfig', function($http, g8arenaConfig) {

  var t = { teams: [], team: {}, allUsers: [] };

  t.create = function(team_params){
    return $http.post( g8arenaConfig.apiUrl + '/teams', team_params)
      .success(function(resp) {
        t.teams.push(resp.data);
      })
      .error(function(resp) {
        console.log(resp.errors);
      });
  };

  t.getAllTeams = function() {
    return $http.get( g8arenaConfig.apiUrl + '/teams').success(function(resp){
      angular.copy(resp.data, t.teams);
    });
  };

  t.getAllUsers = function() {
    return $http.get( g8arenaConfig.apiUrl + '/teams/available_users').success(function(resp){
      angular.copy(resp.data, t.allUsers);
    });
  };

  return t;

}]);