(function () {
    'use strict';

    angular.module('issueTracker.issues')
        .controller('ViewIsssueController',
        ['$scope', '$location', '$routeParams',
            'identity', 'authentication', 'issueService',
            'commentsService',
            function ViewIsssueController($scope, $location, $routeParams,
                identity, authentication, issueService, commentsService) {

                var currentIssueId = $routeParams.issueId;

                issueService.getIssueById(currentIssueId)
                    .then(function success(response) {
                        $scope.issue = response;

                        $scope.userIsAssignee = function () {
                            return $scope.issue.Assignee.Id == identity.getUserData().Id;
                        }

                        $scope.userIsProjectLeader = function () {
                            return $scope.issue.Author.Id == identity.getUserData().Id
                                || authentication.isAdmin();
                        }
                    });

                commentsService.getIssueComments(currentIssueId)
                    .then(function success(response) {
                        $scope.comments = response;
                    });

                $scope.changeIssueStatus = function changeIssueStatus(status) {
                    issueService.changeIssueStatus(currentIssueId, status.Id)
                        .then(function success(response) {
                            issueService.getIssueById(currentIssueId)
                                .then(function success(response) {
                                    $scope.issue = response;
                                });
                        });
                }

                $scope.addComment = function addComment(comment) {
                    commentsService.addCommentToIssue(currentIssueId, comment)
                        .then(function success(response) {
                            commentsService.getIssueComments(currentIssueId)
                                .then(function success(response) {
                                    $scope.comments = response;
                                });
                        })
                }
            }]);
} ());