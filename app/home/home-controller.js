angular.module('issueTracker.home', [
    'issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/login.html',
            controller: 'HomeController',
        })
    }])

    .controller('HomeController', [
        '$scope', 'authentication',
        function HomeController($scope, authentication) {

            $scope.login = function (user) {
                console.log(user);
                authentication.loginUser(user);
            };
        }
    ]);