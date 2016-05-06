angular.module('issueTracker.projects')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'project/add-project.html',
            controller: 'AddProjectController',
        });
    }])
    .controller('AddProjectController', [
        '$scope', '$location', '$routeParams',
        'identity', 'issueService', 'projectService',
        'labelsService',
        'authentication', '$sce', '$q',
        function ($scope, $location, $routeParams, identity, issueService, projectService, labelsService, authentication, $sce, $q) {

            authentication.getAllUsers()
                .then(function (response) {
                    console.log(response);
                    $scope.users = response;
                });

            $scope.addProject = function addIssue(project) {

                var labelsTemp = project.Label.split(/,\s*/);
                project.Labels = [];
                labelsTemp.forEach(function name(label) {
                    project.Labels.push({ Name: label });
                });
                var prioritiesTemp = project.Priority.split(/,\s*/);
                project.Priorities = [];
                prioritiesTemp.forEach(function name(priority) {
                    project.Priorities.push({ Name: priority });
                });
                project.LeadId = project.Lead.Id;
                delete project.Label;
                delete project.Lead;
                delete project.Priority;
                console.log(project);

                projectService.addProject(project);
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
        }]);