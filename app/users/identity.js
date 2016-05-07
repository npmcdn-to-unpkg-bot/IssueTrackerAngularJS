(function () {
    'use strict';

    angular.module('issueTracker.users.identity', [])
        .factory('identity', ['localStorageService',
            function (localStorageService) {
                var key = "user";

                return {
                    getUserData: getUserData,
                    saveUserData: saveUserData,
                    deleteUserData: deleteUserData
                }

                function saveUserData(userToken) {
                    localStorageService.set(key, userToken);
                }

                function getUserData() {
                    return localStorageService.get(key);
                }

                function deleteUserData() {
                    return localStorageService.remove(key);
                }
            }
        ]);
} ());