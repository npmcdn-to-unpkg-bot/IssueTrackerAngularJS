angular.module('issueTracker.users.identity', [])
    .factory('identity', ['localStorageService',
        function (localStorageService) {
            var key = "user";

            return {
                getUserData: getUserData,
                saveUserData: saveUserData
            }

            function saveUserData(userToken) {
                localStorageService.set(key, userToken);

            }

            function getUserData() {
                return localStorageService.get(key);
            }
        }
    ]);