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

        function put(url, postData) {
            var defered = $q.defer();

            $http.put(BASE_URL + '/' + url, postData)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    console.log(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function setAuthorization(accessToken) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
        }

        function set_X_Form_URL_Encoded_Header(accessToken) {
            $http.defaults.headers.post =
                { 'Content-type': 'application/x-www-form-urlencoded' };
        }

        function set_JSON_Header(accessToken) {
            $http.defaults.headers.post =
                { 'Content-type': 'application/json' };
        }
    }

    angular.module('issueTracker.common', [])
        .factory('requester', ['$http', '$q', 'BASE_URL', requester]);
} ());