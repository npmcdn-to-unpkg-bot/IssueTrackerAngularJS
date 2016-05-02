angular.module('issueTracker.users.authentication', [])
    .factory('authentication', ['requester', 'identity',
        function (requester, identity) {

            return {
                loginUser: loginUser,
                refreshAuthorization: refreshAuthorization,
                isAuthenticated: isAuthenticated
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
                        requester.get('users/me')
                            .then(function (data) {
                                data.accessToken = accessToken;
                                identity.saveUserData(data);
                            })
                    });


            }

            function isAuthenticated() {
                return !!identity.getUserData();
            }

            function refreshAuthorization() {
                if (isAuthenticated()) {
                    requester.setAuthorization(identity.getUserData().accessToken);
                }

            }
        }


    ]);