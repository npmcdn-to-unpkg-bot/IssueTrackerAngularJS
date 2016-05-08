(function () {
    'use strict';

    angular.module('issueTracker.projects')
        .controller('EditProjectController', [
            '$scope', '$location', '$routeParams',
            'identity', 'projectService',
            'labelsService', 'authentication', 'notifier',
            '$sce', '$q',
            function EditProjectController($scope, $location, $routeParams,
                identity, projectService, labelsService,
                authentication, notifier, $sce, $q) {

                projectService.getProjectById($routeParams.projectId)
                    .then(function name(response) {

                        response.Priority = response.Priorities.map(x => x.Name).join(", ");
                        response.Label = response.Labels.map(x => x.Name).join(", ");

                        $scope.project = response;
                        checkRights();
                        $scope.isAdmin = authentication.isAdmin;
                    });

                authentication.getAllUsers()
                    .then(function (response) {
                        $scope.users = response;
                    });


                $scope.editProject = function editProject(project) {
                    project = formatLabels(project);
                    project = formatPriorities(project);
                    project.LeadId = project.Lead.Id;

                    delete project.Label;
                    delete project.Lead;
                    delete project.Priority;
                    delete project.ProjectKey;

                    projectService.editProject(project)
                        .then(function success(response) {
                            notifier.success('Project edited');
                            $location.path('projects/' + $routeParams.projectId);
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