angular.module('issueTracker.projects',
    ['issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId', {
            templateUrl: 'project/view-project.html',
            controller: 'ViewProjectController',
        });
    }])
    .controller('ViewProjectController', ['$scope', '$routeParams', '$location', 'projectService',
        'issueService',
        function ($scope, $routeParams, $location, projectsService, issueService) {

            projectsService.getProjectById($routeParams.projectId).then(
                function (response) {
                    console.log(response);
                    response.Labels = response.Labels.map(x => x.Name).join(" ");
                    response.Priorities = response.Priorities.map(x => x.Name).join(" ");
                    $scope.project = response;
                });

            issueService.getIssuesByProject($routeParams.projectId).then(
                function (response) {
                    console.log(response);
                    $scope.issues = response;
                });

            $scope.test = function () {
                console.log("test works");
            }

            $scope.addIssue = function () {
                $location.path('/projects/' + $routeParams.projectId + '/add-issue');
            }
        }
    ])