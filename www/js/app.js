// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hciApp', ['ionic', 'firebase', 'hciApp.controllers', 'hciApp.services',
    'hciApp.directives', 'hciApp.filters', 'ngAnimate', 'ngTouch'])
    .constant('FORECASTIO_KEY', 'e5fb549e22c9c3c729ce5a5ec0c6dff7')
    .constant('FLICKR_API_KEY', '504fd7414f6275eb5b657ddbfba80a2c')
    .constant('AWS_ACCESS_KEY', 'AKIAIIXJM3G6BRX3W4WQ')
    .constant('AWS_SECRETE_KEY', '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')
    .constant('FIREBASE_URL', 'https://hcicontactmessages.firebaseio.com/')
    .constant('KIMONOLABS', 'PBxXzZKLn1a3GJFK34ang11OgF95uY1k')
    .filter('int', function() {
        return function(v) {
            return parseInt(v) || '';
        };
    })
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function(AWSServiceProvider){
        AWSServiceProvider.setKeys('AKIAIIXJM3G6BRX3W4WQ', 'G9ffD62jLdSLgMCzJbtjQudOf3Fj3cztP8E0Czac')
    })
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider

          .state('app', {
              url: "/app",
              abstract: true,
              templateUrl: "templates/menu.html",
              controller: 'MenuCtrl'
          })

          .state('app.playlists', {
              url: "/playlists",
              views: {
                  'menuContent' :{
                      templateUrl: "templates/playlists.html",
                      controller: 'PlaylistsCtrl'
                  }
              }
          })

          .state('app.single', {
              url: "/playlists/:playlistId",
              views: {
                  'menuContent' :{
                      templateUrl: "templates/playlist.html",
                      controller: 'PlaylistCtrl'
                  }
              }
          });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/playlists');
    });

