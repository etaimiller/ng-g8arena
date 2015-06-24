'use strict';

angular.module('ngG8arenaApp')
  .controller('MatchCtrl', [
    '$scope',
    '$state',
    'Team',
    function($scope, $state, Team) {

      $scope.onSubmit = onSubmit;
      $scope.model = {};

      $scope.fields = [
        {
          type: 'select',
          key: 'player_1',
          templateOptions: {
            label: 'The first name of this person'
          }
        },
        {
          type: 'select',
          key: 'characters',
          templateOptions: {
            label: 'Character',
            options: [
              {name: 'Sheeva', value: 'sheeva'},
              {name: 'Jaxx', value: 'jaxx'},
              {name: 'Sonya', value: 'sonya'},
              {name: 'Sub Zero', value: 'sub_zero'}
            ]
          }
        }
      ];

      function onSubmit(){
        alert("submitting");
      }
    }
  ]);