'use strict';

angular.module('ngG8arenaApp')
  .controller('AuthCtrl', [
    '$scope',
    '$auth',
    '$state',
    function($scope, $auth, $state) {

      $scope.message = 'Welcome to the home controller';

      $scope.login = function() {
        $auth.submitLogin($scope.user)
        .then(function(){
          $state.go('match.index');
        })
        .catch(function(resp) {
          console.log(resp);
        });
      };

      $scope.register = function() {
        console.log("user details:");
        console.log($scope.user);
        $auth.submitRegistration($scope.user)
        .then(function(){
          $state.go('team.index');
        })
        .catch(function(resp) {
          console.log(resp);
        });
      };


    }
  ]);