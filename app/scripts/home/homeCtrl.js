'use strict';

angular.module('ngG8arenaApp')
  .controller('HomeCtrl', [
    '$scope',
    function($scope){
      $scope.message = 'Welcome to the home controller';
    }
  ]);