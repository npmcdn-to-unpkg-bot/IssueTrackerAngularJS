angular.module('issueTracker.users.identity', [])
    .factory('identity', ['localStorageServiceProvider',
        function (localStorageServiceProvider) {
            var key = "user";

            return {
                getUserData: getUserData,
                saveUserData: saveUserData
            }

            function saveUserData(user) {
                localStorageServiceProvider.set(key, data);

            }

            function getUserData(user) {
                localStorageServiceProvider.get(key);
            }
        }
    ]);