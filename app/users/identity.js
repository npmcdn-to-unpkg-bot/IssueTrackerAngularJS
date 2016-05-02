angular.module('issueTracker.users.identity', [])
    .factory('identity', ['localStorageService',
        function (localStorageService) {
            var key = "user";

            return {
                getUserData: getUserData,
                saveUserData: saveUserData
            }

            function saveUserData(user) {
                localStorageService.set(key, user);

            }

            function getUserData() {
                return localStorageService.get(key);
            }
        }
    ]);