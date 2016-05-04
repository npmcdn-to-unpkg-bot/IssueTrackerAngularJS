angular.module('issueTracker.issues')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:issueId', {
            templateUrl: 'issue/view-issue.html',
            controller: 'ViewIsssueController',
        });
    }])
    .controller('ViewIsssueController',
    ['$scope', '$location', '$routeParams', 'identity', 'issueService',
        function ($scope, $location, $routeParams, identity, issueService) {
            issueService.getIssueById($routeParams.issueId).then(
                function (response) {
                    $scope.issue = response;
                });
        }]);