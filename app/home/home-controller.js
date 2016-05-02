angular.module('issueTracker.home', [
    'issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/login.html',
            controller: 'HomeController',
        })
    }])

    .controller('HomeController', [
        '$scope', '$location', 'authentication',
        function HomeController($scope, $location, authentication) {
            var loginMode = true;
            $scope.isAuthenticated = !authentication.isAuthenticated();
            $scope.loginMode = loginMode;
            $scope.toggleLogin = toggleLogin;
            $scope.login = function (user) {

                console.log(user);

                authentication.loginUser(user)
                    .then(function (params) {
                        $location.path("/issues");
                    });
            };

            function toggleLogin() {
                loginMode = !loginMode;
                $scope.loginMode = loginMode;
            }
        }
    ]);