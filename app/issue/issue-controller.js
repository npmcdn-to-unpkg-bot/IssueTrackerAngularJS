angular.module('issueTracker.issues',
    ['issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {

        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAuthenticated()) {

                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        }
        $routeProvider.when('/issues', {
            templateUrl: 'issue/issue.html',
            controller: 'IssueController',
            resolve: routeChecks.authenticated
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