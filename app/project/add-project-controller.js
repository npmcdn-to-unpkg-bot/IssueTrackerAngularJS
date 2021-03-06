(function () {
    'use strict';

    angular.module('issueTracker.projects')

        .controller('AddProjectController', [
            '$scope', '$location', '$routeParams',
            'identity', 'issueService', 'projectService',
            'labelsService', 'notifier',
            'authentication', '$sce', '$q',
            function ($scope, $location, $routeParams,
                identity, issueService, projectService,
                labelsService, notifier, authentication,
                $sce, $q) {

                $scope.addProject = function addIssue(project) {

                    project.LeadId = project.Lead.Id;
                    project = formatLabels(project);
                    project = formatPriorities(project);

                    delete project.Label;
                    delete project.Lead;
                    delete project.Priority;

                    projectService.addProject(project)
                        .then(function success(response) {
                            notifier.success('Project added!');
                            $location.path('/');
                        });
                }

                authentication.getAllUsers()
                    .then(function (response) {
                        $scope.users = response;
                    });

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

                function formatLabels(project) {
                    var labelsTemp = project.Label.split(/,\s*/);
                    project.Labels = [];
                    labelsTemp.forEach(function name(label) {
                        project.Labels.push({ Name: label });
                    });
                    return project;
                }

                function formatPriorities(project) {
                    var prioritiesTemp = project.Priority.split(/,\s*/);
                    project.Priorities = [];
                    prioritiesTemp.forEach(function name(priority) {
                        project.Priorities.push({ Name: priority });
                    });
                    return project;
                }
            }]);
} ());