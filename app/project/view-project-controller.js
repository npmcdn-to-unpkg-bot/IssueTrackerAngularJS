angular.module('issueTracker.projects', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:projectId', {
            templateUrl: 'project/view-project.html',
            controller: 'ViewProjectController',
        });
    }])
    .controller('ViewProjectController', ['$scope', '$routeParams', '$location', 'identity', 'projectService',
        'issueService',
        function ($scope, $routeParams, $location, identity, projectsService, issueService) {

            projectsService.getProjectById($routeParams.projectId).then(
                function (response) {
                    console.log(response);
                    response.Labels = response.Labels.map(x => x.Name).join(" ");
                    response.Priorities = response.Priorities.map(x => x.Name).join(" ");
                    $scope.project = response;
                    $scope.userIsProjectLeader = function () {
                        return $scope.project.Lead.Id == identity.getUserData().Id;
                    }
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