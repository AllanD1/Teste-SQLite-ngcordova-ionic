angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('profissao', function($scope, $cordovaSQLite, $rootScope) {
      
      $scope.insertProf = function(){
          var query = "insert into profissao(titulo) values (?)";
          $cordovaSQLite.execute(db,query,[$scope.tituloProf]).then(function(result) {
              $scope.resultado = "Insert OK.";
              $scope.selectProf();
          }, function(error){
            console.log(error);
              $scope.resultado = "Insert FAIL!";
          })
      }  
})
.controller('pessoa', function($scope, $cordovaSQLite, $rootScope) {
      
        $rootScope.insertPessoa = function(){
          console.log($scope.nome, $scope.idade ,$scope.idProf);
            var query = "insert into pessoa(nome,idade,profissao_id) values (?,?,?)";
          $cordovaSQLite.execute(db,query,[$scope.nome, $scope.idade ,$scope.idProf]).then(function(result) {
              $scope.resultado = "Insert OK.";
              // $scope.selectProf();
              console.log(result)
              $rootScope.selectPessoa();
          }, 
          function(error){
              
              console.log(error)
              $scope.resultado = "Insert FAIL!";
          })
        }

});
