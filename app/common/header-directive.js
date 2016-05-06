angular.module('issueTracker.common')
    .controller('HeaderController', ['$scope', 'authentication', 'identity',
        function ($scope, authentication, identity) {
            $scope.isAuthenticated = authentication.isAuthenticated;

            $scope.identity = identity;
        }])
    .directive('headerDirective', function () {
        return {
            templateUrl: 'common/header.html',
            restrict: 'A',
            replace: true,
            controller: 'HeaderController'
        };
    })
