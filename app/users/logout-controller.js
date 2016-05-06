angular.module('issueTracker.users.logout',
    ['issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutController',
            templateUrl: '/',
        });
    }])
    .controller('LogoutController', ['authentication', '$location',
        function (authentication, $location) {
            authentication.logout();
            $location.path('/home');
        }
    ])