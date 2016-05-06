angular.module('issueTracker.users.logout',
    ['issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutController',
            templateUrl: 'users/logout.html',
        });
    }])
    .controller('LogoutController', ['$location', 'authentication', 'notifier',
        function ($location, authentication, notifier) {
            authentication.logout();
            notifier.success('Successfully logged out. Goodbye!');
            $location.path('/home');
        }
    ])