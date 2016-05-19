// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB({name: "teste.db"});
        // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS profissao");
        // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS pessoa");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS profissao (idprofissao INTEGER PRIMARY KEY, titulo text)");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pessoa (idpessoa INTEGER PRIMARY KEY, nome text, idade NUMERIC, profissao_id INTEGER NOT NULL,FOREIGN KEY(profissao_id) REFERENCES profissao(idprofissao))");
  
        $rootScope.selectProf = function(){
          $rootScope.profList = [];
          var query = "select * from profissao";
          $cordovaSQLite.execute(db,query,[]).then(function(result) {
              if(result.rows.length > 0){
                  for(var i = 0; i < result.rows.length; i++) {
                    $rootScope.profList.push({idprofissao: result.rows.item(i).idprofissao, titulo: result.rows.item(i).titulo});
                  }
                  console.log($rootScope.profList);
              } else {
                  $rootScope.resultado = "Last Name Not Found!";
              }
          }, 
          function(error){
              console.log(error);
          });
        }



        $rootScope.selectPessoa = function(){
            $rootScope.pessoaList = [];
          var query = "SELECT p.idpessoa, p.nome, p.idade, p.idade, pf.titulo FROM pessoa AS p  INNER JOIN profissao AS pf ON p.profissao_id = pf.idprofissao";
          $cordovaSQLite.execute(db,query,[]).then(function(result) {
              if(result.rows.length > 0){
                  for(var i = 0; i < result.rows.length; i++) {
                    $rootScope.pessoaList.push({idpessoa: result.rows.item(i).idpessoa, nome: result.rows.item(i).nome, idade: result.rows.item(i).idade, titulo: result.rows.item(i).titulo});
                  }
                  console.log($rootScope.pessoaList);
              } else {
                  $rootScope.resultado = "Last Name Not Found!";
              }
          }, 
          function(error){
              console.log(error);
          });
        }
        
           $rootScope.selectProf();
          $rootScope.selectPessoa();
        

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'pessoa'
      }
    }
  })

    .state('app.profissao', {
      url: '/profissao',
      views: {
        'menuContent': {
          templateUrl: 'templates/profissao.html',
          controller: 'profissao'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
