'use strict';

angular.module('ngG8arenaApp')
  .controller('MatchCtrl', [
    '$scope',
    '$state',
    'Team',
    'Characters',
    'Match',
    function($scope, $state, Team, Characters, Match) {
      $scope.teams = Team.teams;
      $scope.allMatches = Match.allMatches;
      $scope.readableMatches = Match.readableMatches;

      $scope.onSubmit = onSubmit;
      $scope.model = {};

      $scope.fields = [
        {
          type: 'select',
          key: 'winning_team',
          templateOptions: {
            label: 'Winning Team: Select user(s)',
            options: convertTeamsToSelectOptions(),
            required: true
          }
        },
        {
          type: 'select',
          key: 'winning_team_c1',
          templateOptions: {
            label: 'User',
            options: convertCharactersToSelectOptions(),
            required: true
          },
          hideExpression: '!model.winning_team',
          expressionProperties: {
            'templateOptions.label': function($viewValue, $modelValue, scope){
              if(scope.model.winning_team){
                if(scope.model.winning_team.users.length === 1){
                  return scope.model.winning_team.users[0].first_name + '\'s 1st character:';
                }
                else{
                  return scope.model.winning_team.users[0].first_name + '\'s character';
                }
              }
            }
          }
        },
        {
          type: 'select',
          key: 'winning_team_c2',
          templateOptions: {
            label: 'User',
            options: convertCharactersToSelectOptions(),
            required: true
          },
          hideExpression: '!model.winning_team',
          expressionProperties: {
            'templateOptions.label': function($viewValue, $modelValue, scope){
              if(scope.model.winning_team){
                if(scope.model.winning_team.users.length === 1){
                  return scope.model.winning_team.users[0].first_name + '\'s 2nd character:';
                }
                else{
                  return scope.model.winning_team.users[1].first_name + '\'s character';
                }
              }
            }
          }
        },
        {
          "template": "<div style='text-align:center'><h4>VS</h4></div>"
        },
        {
          type: 'select',
          key: 'losing_team',
          templateOptions: {
            label: 'Losing Team: Select user(s)',
            options: convertTeamsToSelectOptions(),
            required: true
          }
        },
        {
          type: 'select',
          key: 'losing_team_c1',
          templateOptions: {
            label: 'User',
            options: convertCharactersToSelectOptions(),
            required: true
          },
          hideExpression: '!model.losing_team',
          expressionProperties: {
            'templateOptions.label': function($viewValue, $modelValue, scope){
              if(scope.model.losing_team){
                if(scope.model.losing_team.users.length === 1){
                  return scope.model.losing_team.users[0].first_name + '\'s 1st character:';
                }
                else{
                  return scope.model.losing_team.users[0].first_name + '\'s character';
                }
              }
            }
          }
        },
        {
          type: 'select',
          key: 'losing_team_c2',
          templateOptions: {
            label: 'User',
            options: convertCharactersToSelectOptions(),
            required: true
          },
          hideExpression: '!model.losing_team',
          expressionProperties: {
            'templateOptions.label': function($viewValue, $modelValue, scope){
              if(scope.model.losing_team){
                if(scope.model.losing_team.users.length === 1){
                  return scope.model.losing_team.users[0].first_name + '\'s 2nd character:';
                }
                else{
                  return scope.model.losing_team.users[1].first_name + '\'s character';
                }
              }
            }
          }
        },
        {
          type: 'radio',
          key: 'rounds',
          templateOptions: {
            label: 'Number of rounds:',
            options: [
              {name: "2", value: 2},
              {name: "3", value: 3}
            ],
            required: true
          },
          hideExpression: '!model.losing_team_c1 || !model.losing_team_c2 || !model.winning_team_c1 || !model.losing_team_c2'
        }

      ];

      function onSubmit(){
        console.log("Submitting match");
        Match.create({
          'match': {
            'result': angular.toJson($scope.model)
          }
        }).then(function(){
          $scope.options.resetModel();
          $state.go('match.index');
        });
      }

      function convertCharactersToSelectOptions(){
        var characterArray = [];
        for(var i = 0; i < Characters.allOptions.length; i++){
          var characterName = Characters.allOptions[i].name;
          characterArray.push({
            name: characterName, value: Characters.formatToEnum(characterName)
          });
        }
        return characterArray;
      }

      function convertTeamsToSelectOptions(){
        var select_options = [];
        for(var i = 0; i < $scope.teams.length; i++){
          if ($scope.teams[i].users.length > 1) {
            select_options.push({
              name: $scope.teams[i].users[0].first_name + " & " + $scope.teams[i].users[1].first_name, value: $scope.teams[i]
            });
          }
          else {
            select_options.push({
              name: $scope.teams[i].users[0].first_name, value: $scope.teams[i]
            });
          }

        }
        return select_options;
      }
    }
  ]);