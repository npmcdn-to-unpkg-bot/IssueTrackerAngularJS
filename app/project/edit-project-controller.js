angular.module('issueTracker.issues')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId/edit', {
            templateUrl: 'project/edit-project.html',
            controller: 'EditProjectController',
        });
    }])
    .controller('EditProjectController', [
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
            projectService.getProjectById($routeParams.projectId)
                .then(function name(response) {
                    response.Priority = response.Priorities.map(x => x.Name).join(", ");
                    response.Label = response.Labels.map(x => x.Name).join(", ");
                    $scope.project = response;
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
                delete project.ProjectKey;
                console.log(project);

                projectService.editProject(project);
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