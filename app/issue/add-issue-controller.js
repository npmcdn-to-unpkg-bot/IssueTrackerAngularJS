(function () {
    'use strict';

    angular.module('issueTracker.issues')
        .controller('AddIsssueController', [
            '$scope', '$location', '$routeParams',
            'identity', 'issueService', 'projectService',
            'labelsService',
            'authentication', '$sce', '$q', 'notifier',
            function AddIsssueController($scope, $location, $routeParams,
                identity, issueService, projectService,
                labelsService, authentication,
                $sce, $q, notifier) {

                var currentProjectId = $routeParams.projectId;

                projectService.getProjectById(currentProjectId)
                    .then(function success(response) {
                        $scope.project = response;
                        checkRights();
                    });

                authentication.getAllUsers()
                    .then(function (response) {
                        $scope.users = response;
                    });

                $scope.addIssue = function addIssue(issueToAdd) {

                    issueToAdd.ProjectId = currentProjectId;
                    issueToAdd.PriorityId = issueToAdd.Priority.Id;
                    issueToAdd.AssigneeId = issueToAdd.Assignee.Id;
                    issueToAdd = formatLabels(issueToAdd);

                    delete issueToAdd.Label;
                    delete issueToAdd.Assignee;
                    delete issueToAdd.Priority;

                    issueService.addIssue(issueToAdd)
                        .then(function success(params) {
                            notifier.success("Issue added!");
                            $location.path('/projects/' + currentProjectId);
                        });
                }

                $scope.openDate = function () {
                    $scope.popup.opened = true;
                };

                $scope.popup = {
                    opened: false
                };

                $scope.format = 'dd-MMMM-yyyy'

                $scope.dirty = {};

                var suggestLabelRemoteAndDelimited = function (term) {
                    var ix = term.lastIndexOf(','),
                        lhs = term.substring(0, ix + 1),
                        rhs = term.substring(ix + 1),
                        deferred = $q.defer();

                    deferred.resolve(labelsService.getFilteredLabels(rhs)
                        .then(function (response) {
                            var labels = response;
                            var result = [];
                            labels.forEach(function (l) {
                                result.push({ label: l.Name, value: lhs + l.Name });
                            });

                            return result;
                        }));

                    return deferred.promise;
                };

                $scope.ac_option_delimited = {
                    suggest: suggestLabelRemoteAndDelimited
                };

                function checkRights() {
                    if ($scope.project.Lead.Id != identity.getUserData().Id
                        && !authentication.isAdmin()) {
                        $location.path('/');
                        notifier.error('Unauthorized access! Only project leaders can view this page!');
                    }
                }

                function formatLabels(issueToAdd) {
                    var labelsTemp = issueToAdd.Label.split(/,\s*/);
                    issueToAdd.Labels = [];
                    labelsTemp.forEach(function name(label) {
                        issueToAdd.Labels.push({ Name: label });
                    });

                    return issueToAdd;
                }
            }]);
} ());