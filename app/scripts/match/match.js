'use strict';

angular.module('ngG8arenaApp')

.factory('Match', ['$http','g8arenaConfig', function($http, g8arenaConfig) {

  var m = { allMatches: [], match: {}, readableMatches: [] };

  m.create = function(match_params){
    return $http.post( g8arenaConfig.apiUrl + '/matches', match_params)
      .success(function(resp) {
        // m.allMatches.push(resp.data);
      })
      .error(function(resp) {
        console.log(resp.errors);
      });
  };

  m.getAllMatches = function() {
    return $http.get( g8arenaConfig.apiUrl + '/matches').success(function(resp){
      angular.copy(resp.data, m.allMatches);
      console.log(m.allMatches[0]);
      m.readableMatches = convertMatchesToReadable();
    });
  };

  m.getUserMatches = function() {
    // return $http.get( g8arenaConfig.apiUrl + '/teams/available_users').success(function(resp){
    //   angular.copy(resp.data, t.allUsers);
    // });
  };

  function convertMatchesToReadable(){
    var readableMatches = [];
    for(var i = 0; i < m.allMatches.length; i++){
      var result = angular.fromJson(m.allMatches[i].result);
      readableMatches.push({
        winning_team: winnersWithCharacters(result),
        losing_team: losersWithCharacters(result),
        rounds: result.rounds,
        created_at: m.allMatches[i].created_at
      });
    }
    return readableMatches;
  }

  function winnersWithCharacters(result){
    var winning_users = [];
    if(result.winning_team.users.length > 1){
      winning_users = [
        {name: result.winning_team.users[0].first_name, character: result.winning_team_c1 },
        {name: result.winning_team.users[1].first_name, character: result.winning_team_c2 },
      ];
    }
    else{
      winning_users = [
        {name: result.winning_team.users[0].first_name, characters: [result.winning_team_c1, result.winning_team_c2]}
      ];
    }
    return winning_users;
  }

  function losersWithCharacters(result) {
    var losing_users = [];
    if(result.losing_team.users.length > 1){
      losing_users = [
        {name: result.losing_team.users[0].first_name, character: result.losing_team_c1 },
        {name: result.losing_team.users[1].first_name, character: result.losing_team_c2 },
      ];
    }
    else{
      losing_users = [
        {name: result.losing_team.users[0].first_name, characters: [result.losing_team_c1, result.losing_team_c2]}
      ];
    }
    return losing_users;
  }

  return m;

}]);