angular.module('issueTracker.users.authentication', [])
    .factory('authentication', ['requester', 'identity',
        function (requester, identity) {

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
                        identity.saveUserData(response.access_token);
                        console.log(identity.getUserData());
                    });
            }
        }]);