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

      $scope.$on('auth:registration-email-success', function (event, user){
        $scope.user = user;

        console.log('Registration successful');
        console.log(user);
      });

      $scope.$on('auth:login-success', function (event, user){
        $scope.user = user;
        console.log($auth.user);
        console.log('Successful Login');
      });

      $scope.$on('auth:logout-error', function (event){
        console.log('logout error because:', event.errors[0]);
      });

      $scope.$on('auth:logout-success', function (){
        $scope.user = {};
        console.log('Successfull Logout');
        $state.go('home');
      });
    }
  ]);