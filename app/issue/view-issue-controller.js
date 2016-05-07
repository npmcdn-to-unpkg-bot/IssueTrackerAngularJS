angular.module('issueTracker.issues')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:issueId', {
            templateUrl: 'issue/view-issue.html',
            controller: 'ViewIsssueController',
        });
    }])
    .controller('ViewIsssueController',
    ['$scope', '$location', '$routeParams', 'identity', 'issueService', 'commentsService',
        function ($scope, $location, $routeParams, identity, issueService, commentsService) {
            issueService.getIssueById($routeParams.issueId).then(
                function (response) {
                    console.log(response);
                    $scope.issue = response;

                    $scope.userIsAssignee = function () {
                        return $scope.issue.Assignee.Id == identity.getUserData().Id;
                    }

                    $scope.userIsProjectLeader = function () {
                        return $scope.issue.Author.Id == identity.getUserData().Id;
                    }
                });

            commentsService.getIssueComments($routeParams.issueId).then(
                function (response) {
                    console.log(response);
                    $scope.comments = response;
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

            $scope.addComment = function (comment) {
                commentsService.addCommentToIssue($routeParams.issueId, comment)
                    .then(function success(params) {
                        commentsService.getIssueComments($routeParams.issueId).then(
                            function (response) {
                                console.log(response);
                                $scope.comments = response;
                            });
                    })
            }
        }]);