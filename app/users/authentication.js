angular.module('issueTracker.users.authentication', [])
    .factory('authentication', ['requester', 'identity',
        function (requester, identity) {

            return {
                loginUser: loginUser,
                refreshCookie: refreshCookie,
                isAuthenticated:isAuthenticated
            }

            function loginUser(user) {
                console.log(user);
                var loginUserData = "grant_type=password&username="
                    + user.email + "&password=" + user.password;
                console.log(loginUserData);

               return requester.post('api/Token', loginUserData)
                    .then(function (response) {
                        accessToken = response.access_token;
                        requester.setAuthorization(accessToken);
                        identity.saveUserData(accessToken);
                    });
                    
                    
            }

            function isAuthenticated() {
                return !!identity.getUserData();
            }

            function refreshCookie() {

                requester.setAuthorization(identity.getUserData());
            }
        }


    ]);