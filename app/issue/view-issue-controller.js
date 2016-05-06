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
                    console.log(response);
                    $scope.issue = response;
                });

            $scope.changeIssueStatus = function (status) {
                issueService.changeIssueStatus($scope.issue.Id, status.Id)
                    .then(function name(params) {
                        issueService.getIssueById($routeParams.issueId).then(
                            function (response) {
                                console.log(response);
                                $scope.issue = response;
                            });
                    });
            }
        }]);