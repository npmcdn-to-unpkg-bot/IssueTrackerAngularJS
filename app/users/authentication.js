angular.module('issueTracker.users.authentication', [])
    .factory('authentication', ['requester',
     'localStorageServiceProvider',
        function (requester, localStorageServiceProvider) {

            return {
                loginUser: loginUser,
            }

            function loginUser(user) {
                console.log(user);
                var loginUserData = "grant_type=password&username="
                    + user.email + "&password=" + user.password;
                    console.log(loginUserData);
                requester.post('api/Token', loginUserData)
                    .then(function (response) {
                        console.log(response);
                    });
            }
        }]);