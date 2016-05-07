angular.module('issueTracker.users.authentication', [])
    .factory('authentication', ['$location', 'requester', 'identity',
        function ($location, requester, identity) {

            return {
                loginUser: loginUser,
                registerUser: registerUser,
                refreshAuthorization: refreshAuthorization,
                isAuthenticated: isAuthenticated,
                getAllUsers: getAllUsers,
                logout: logout,
                changePassword: changePassword,
                isAdmin: isAdmin
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
                                $location.path('#/');
                            })
                    });

            }

            function registerUser(user) {
                return requester.post('api/Account/Register', user)
            }

            function isAuthenticated() {
                return !!identity.getUserData();
            }

            function refreshAuthorization() {
                if (isAuthenticated()) {
                    requester.setAuthorization(identity.getUserData().accessToken);
                }
            }

            function getAllUsers(user) {
                return requester.get('Users/');
            }

            function logout(user) {
                requester.setAuthorization(undefined);
                identity.deleteUserData();
            }

            function changePassword(data) {
                return requester.post('api/Account/ChangePassword', data);
            }

            function isAdmin() {
                if (isAuthenticated()) {
                    return identity.getUserData().isAdmin;
                }
                return false;
            }
        }
    ]);