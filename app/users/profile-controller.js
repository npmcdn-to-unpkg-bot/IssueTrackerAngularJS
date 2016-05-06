angular.module('issueTracker.users.logout',
    ['issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/password', {
            controller: 'LogoutController',
            templateUrl: 'users/logout.html',
        });
    }])
    .controller('LogoutController', ['$scope', '$location', 'authentication', 'notifier',
        function ($scope, $location, authentication, notifier) {

            $scope.changePassword = function changePassword(data) {
                authentication.changePassword(data);
                notifier.success('Successfully logged out. Goodbye!');
            }


        }
    ])