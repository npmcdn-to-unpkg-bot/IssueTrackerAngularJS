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
        'authentication',
        function ($scope, $location, $routeParams, identity, issueService, projectService, authentication) {

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
            }



            $scope.openDate = function () {
                $scope.popup.opened = true;
            };

            $scope.popup = {
                opened: false
            };

            $scope.format = 'dd-MMMM-yyyy'
        }]);