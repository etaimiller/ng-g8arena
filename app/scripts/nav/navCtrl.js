'use strict';

angular.module('ngG8arenaApp')
  .controller('NavCtrl', [
    '$scope',
    '$auth',
    '$state',
    function($scope, $auth, $state) {

      $scope.logout = function() {
        console.log('logging out');
        $auth.signOut()
        .then(function(){
          $state.go('home');
        });
      };
    }
  ]);