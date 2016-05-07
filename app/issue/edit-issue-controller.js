(function () {
    'use strict';

    angular.module('issueTracker.issues')
        .controller('EditIsssueController',
        ['$scope', '$location', '$routeParams',
            'authentication', 'identity', 'issueService',
            'labelsService', 'projectService', 'notifier',
            '$sce', '$q',
            function EditIsssueController(
                $scope, $location, $routeParams,
                authentication, identity, issueService,
                labelsService, projectService, notifier,
                $sce, $q) {

                var currentIssueId = $routeParams.issueId;

                issueService.getIssueById(currentIssueId)
                    .then(function success(response) {
                        response.DueDate = new Date(response.DueDate);
                        response.Label = response.Labels.map(x => x.Name).join(", ");
                        $scope.issue = response;

                        projectService.getProjectById(response.Project.Id)
                            .then(function success(response) {
                                $scope.project = response;
                                checkRights();
                            });
                    });

                authentication.getAllUsers()
                    .then(function success(response) {
                        $scope.users = response;
                    });

                $scope.openDate = function () {
                    $scope.popup.opened = true;
                };

                $scope.popup = {
                    opened: false
                };

                $scope.format = 'dd-MMMM-yyyy'

                $scope.editIssue = function (issueToEdit) {

                    issueToEdit.PriorityId = issueToEdit.Priority.Id;
                    issueToEdit.AssigneeId = issueToEdit.Assignee.Id;
                    issueToEdit = formatLabels(issueToEdit);

                    delete issueToEdit.Label;
                    delete issueToEdit.Assignee;
                    delete issueToEdit.Priority;

                    issueService.editIssue(issueToEdit)
                        .then(function success(response) {
                            response.DueDate = new Date(response.DueDate);
                            response.Label = response.Labels.map(x => x.Name).join(", ");
                            $scope.issue = response;
                            notifier.success('Issue successfully edited!');
                        });
                }

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

                function formatLabels(issueToEdit) {
                    var labelsTemp = issueToEdit.Label.split(/,\s*/);
                    issueToEdit.Labels = [];
                    labelsTemp.forEach(function name(label) {
                        issueToEdit.Labels.push({ Name: label });
                    });

                    return issueToEdit;
                }
            }]);
} ());