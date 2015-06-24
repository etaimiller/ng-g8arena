'use strict';

angular.module('ngG8arenaApp')
  .controller('TeamCtrl', [
    '$scope',
    '$state',
    'Team',
    function($scope, $state, Team) {
      $scope.teams = Team.teams;
      $scope.users = Team.allUsers;

      $scope.onSubmit = onSubmit;
      $scope.model = {};

      $scope.fields = [
        {
          type: 'select',
          key: 'user1',
          templateOptions: {
            label: 'Player 1',
            options: convertUsersToSelectOptions()
          }
        },
        {
          type: 'checkbox',
          key: 'two_players',
          templateOptions: {
            label: 'Another team member?',
          }
        },
        {
          type: 'select',
          key: 'user2',
          templateOptions: {
            label: 'Player 2',
            options: convertUsersToSelectOptions()
          },
          hideExpression: '!model.two_players'
        }

      ];

      function onSubmit(){
        var models = [];
        if($scope.model.user1){
          models.push($scope.model.user1);
          if($scope.model.user2){
            models.push($scope.model.user2);
          }
        }
        Team.create({
          'team': {
            'users': angular.toJson(models)
          }
        });
      }

      function convertUsersToSelectOptions(){
        var select_options = [];
        for(var i = 0; i < $scope.users.length; i++){
          select_options.push({
            name: $scope.users[i].email, value: $scope.users[i]
          });
        }
        return select_options;
      }

    }
  ]);