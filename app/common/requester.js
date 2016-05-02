(function () {
    'use strict';

    function requester($http, $q, BASE_URL) {

        return {
            get: get,
            post: post,
            put: put,
            setAuthorization: setAuthorization
        };

        function get(url, queryParams) {
            var defered = $q.defer();

            $http.get(BASE_URL + '/' + url, { params: queryParams })
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    console.log(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, postData) {
            var defered = $q.defer();

            $http.post(BASE_URL + '/' + url, postData)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    console.log(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function put() {
            throw new Error('Not implemented!');
        }

        function setAuthorization(accessToken) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
           // $http.defaults.headers.post =
          //      { 'Content-type': 'application/x-www-form-urlencoded' };
        }
    }

    angular.module('issueTracker.common', [])
        .factory('requester', ['$http', '$q', 'BASE_URL', requester]);
} ());