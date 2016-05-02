angular.module('issueTracker.issues', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues', {
            templateUrl: 'issue/issue.html',
            controller: 'IssueController',
        })
    }
    ])
    .controller('IssueController', ['$scope', 'issueService',
        function ($scope, issueService) {
            issueService.getIssuesByUser().then(function (response) {
                console.log(response.Issues);
                $scope.issues = response.Issues;
            });
        }
    ])