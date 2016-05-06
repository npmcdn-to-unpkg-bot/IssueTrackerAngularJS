angular.module('issueTracker.issues')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId/add-issue', {
            templateUrl: 'issue/add-issue.html',
            controller: 'AddIsssueController',
        });
    }])
    .controller('AddIsssueController', [
        '$scope', '$location', '$routeParams',
        'identity', 'issueService', 'projectService',
        'labelsService',
        'authentication', '$sce', '$q', 'notifier',
        function ($scope, $location,
            $routeParams, identity, issueService,
            projectService, labelsService, authentication,
            $sce, $q, notifier) {

            authentication.getAllUsers()
                .then(function (response) {
                    console.log(response);
                    $scope.users = response;
                });

            projectService.getProjectById($routeParams.projectId)
                .then(function (response) {
                    console.log(response);
                    $scope.project = response;
                });

            $scope.addIssue = function addIssue(issueToAdd) {
                console.log(issueToAdd);
                issueToAdd.ProjectId = $routeParams.projectId;
                issueToAdd.PriorityId = issueToAdd.Priority.Id;
                var labelsTemp = issueToAdd.Label.split(/,\s*/);
                issueToAdd.Labels = [];
                labelsTemp.forEach(function name(label) {
                    issueToAdd.Labels.push({ Name: label });
                });
                issueToAdd.AssigneeId = issueToAdd.Assignee.Id;
                delete issueToAdd.Label;
                delete issueToAdd.Assignee;
                delete issueToAdd.Priority;
                console.log(issueToAdd);
                issueService.addIssue(issueToAdd);
                notifier.success("Issue added!");
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
        }]);