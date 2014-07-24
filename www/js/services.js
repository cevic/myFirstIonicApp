/**
 * Created by user on 24/07/2014.
 */
// The contents of individual model .js files will be concatenated into dist/models.js

(function() {

// Protects views where AngularJS is not loaded from errors
    if ( typeof angular == 'undefined' ) {
        return;
    };

    var appServ = angular.module('starter.services', ['ngResource']);

    appServ.service('MyService', ['$q', 'AWSService', '$cacheFactory', function($q, AWSService, $cacheFactory) {
        /*var self = this,
            params = { },
            s3Cache = $cacheFactory('s3Cache');
        var service = {
            podcasts: [],
            keys: [],
            currentUser: function(){
                var d = $q.defer();
                AWSService.awsInstance().then(function(){
                    var s3 = s3Cache.get('s3Instance');
                    if(!s3){
                        var s3 = new AWS.S3();
                        s3Cache.put('s3Instance', s3)
                    }
                    d.resolve(s3);
                });
                return d.promise
            },
            listObjects: function (bucket, prefix, marker){
                var d = $q.defer();
                if(prefix) params['Bucket'] = bucket;
                if(prefix) params['Prefix'] = prefix;
                if(marker) params['Marker'] = marker;
                service.currentUser().then(function(obj){
                    obj.listObjects(params, function(err, data){
                        var content = data.Contents;
                        d.resolve(content);
                    });
                });
                return d.promise
            },
            getObjHead: function(paramz){
                var d = $q.defer();
                service.currentUser().then(function(obj) {
                    obj.headObject(paramz, function (err, data) {
                        var s3Obj = s3Cache.get(JSON.stringify(paramz));
                        if (!s3Obj) {
                            var s3Obj = data;
                            s3Cache.put(JSON.stringify(paramz), s3Obj);
                        }
                        d.resolve(s3Obj);
                    })
                });
                return d.promise
            }
        };
        return service*/
    }]);

    appServ.provider('AWSService', function() {
        var self = this;
        AWS.config.region = 'eu-west-1';
        /*set defaults*/
        self.config = null;

        self.setKeys = function(accesskey, secretekey) {
            var config = {
                accessKeyId: accesskey,
                secretAccessKey: secretekey
            };
            return self.config = config;
        };

        self.$get = function($q) {
            var params = self.config,
                deferred = $q.defer();
            return {
                awsInstance: function(){
                    if(!s3Obj){
                        var s3Obj = AWS.config.update(params);
                    }
                    deferred.resolve(s3Obj);
                    return deferred.promise;
                }
            }
        }
    });

})();

