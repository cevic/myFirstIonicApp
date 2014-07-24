var appCtrl = angular.module('hciApp.controllers', []);

appCtrl.controller('MenuCtrl', function($scope, $ionicModal, $timeout) {
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
  },

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
});
/*

appCtrl.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

appCtrl.controller('PlaylistCtrl', function($scope, $stateParams) {
});
*/


appCtrl.controller('PlaylistsCtrl', ['$scope', 'AWSService', 'MyService', '$timeout', '$ionicLoading', '$filter',
    function($scope, AWSService, MyService, $timeout, $ionicLoading, $filter){
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
        /*set the funcion for showing and hiding loading screen*/
        $scope.showLoading = function () {
            $scope.show = $ionicLoading.show({
                content: 'Getting Messages...',
                showBackdrop: false
            })
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };
        /*List the objects and get their header metadata*/
        var bucket = 'hci-media';
        if(!podcasts){
            $scope.showLoading();
            var podcasts = [];
            var objectAndKey = {};
            MyService.listObjects(bucket, 'podcasts/', 'podcasts/').then(function(messages){
                for (var i=0; i<messages.length; i++){
                    var key = messages[i].Key;
                    var cong = {
                        Bucket: bucket,
                        Key: key
                    };
                    (function(i){
                        MyService.getObjHead(cong).then(function(obj){
                            if((obj.Metadata.title !== undefined) && (obj.Metadata.title !== '') && (obj.Metadata.title!== null)){
                                objectAndKey = {
                                    object:obj,
                                    objKey:messages[i].Key
                                };
                                podcasts.push(objectAndKey);
                            }
                        });
                    })(i);
                }

            });
        }
        var timer = $timeout(function(){
            $scope.messages = $filter('orderBy')(podcasts, 'object.Metadata.date', true);
            $scope.hide();
            $scope.predicate =  'object.Metadata.title';
            console.log("messages ",$scope.messages);
        }, 4000);
        //Clean up the timer before we kill this controller
        $scope.$on('$destroy', function() { if (timer) { $timeout.cancel(timer); } });
        $scope.playerControl = false;
    }]);

appCtrl.controller('PlaylistCtrl', ['$scope', '$stateParams', '$filter', 'MyService', '$timeout', '$ionicLoading',
    function($scope, $stateParams, $filter, MyService, $timeout, $ionicLoading){
        /*set the defaults*/
       $scope.imageSrc = null;

        $scope.isPlaying = false;
        /*set the loading show and hide functions*/
        $scope.showLoading = function () {
            $scope.show = $ionicLoading.show({
                content: 'loading...',
                showBackdrop: false
            })
        };
        $scope.hide = function(){$ionicLoading.hide();};
        $scope.showLoading();

        var bucket = 'hci-media';
        /*filter a particular object based on the ETag, then get the Key and call get object metadata. Then model the url for audio*/
        MyService.listObjects(bucket, 'podcasts/', 'podcasts/').then(function(messages){
            function getMessage (){
                var messageObj = $filter('filter')(messages, {ETag: $stateParams.todoId})[0],
                    key = messageObj.Key,
                    params = {
                        Bucket: bucket,
                        Key: key
                    };
                MyService.getObjHead(params).then(function(obj){
                    $scope.podcast = obj;
                });
                $scope.messageSrc = 'https://s3-eu-west-1.amazonaws.com/'+bucket+'/'+key;
                $scope.hide();
            }
            var timer = $timeout(getMessage, 400)
            //Clean up the timer before we kill this controller
            $scope.$on('$destroy', function() { if (timer) { $timeout.cancel(timer); } });
        })
    }])
