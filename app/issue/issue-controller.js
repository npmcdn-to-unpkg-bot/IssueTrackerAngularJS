angular.module('issueTracker.issues',
    ['issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {

        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAuthenticated()) {

                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        }
        $routeProvider.when('/issues', {
            templateUrl: 'issue/issue.html',
            controller: 'IssueController',
            resolve: routeChecks.authenticated
        })
    }
    ])
    .controller('IssueController', ['$scope', '$location', 'identity', 'issueService', 'projectService',
        function ($scope, $location, identity, issueService, projectService) {
            $scope.viewProject = function (projectId) {
                $location.path('/projects/' + projectId);
            }
            var projectIds = [];
            var projectsWithIssues = [];

            issueService.getIssuesByUser().then(function (response) {
                console.log(response.Issues);
                $scope.issues = response.Issues;

                response.Issues.forEach(function (issue) {
                    if (projectIds.indexOf(issue.Project.Id) < 0) {
                        projectIds.push(issue.Project.Id);
                    }
                });

                projectIds.forEach(function (projectId) {
                    projectService.getProjectById(projectId).then(
                        function (response) {
                            projectsWithIssues.push(response);
                            console.log(response);
                        });
                });

                $scope.projectsByIssue = projectsWithIssues;

                console.log(projectIds);
            });

            filters = [];
            var username = identity.getUserData().Username;
            filters.push('Lead.Username == ' + '"' + username + '"')
            
            projectService.getFilteredProjects(10, 1, filters).then(function (response) {
                console.log(response.Projects);
                $scope.projects = response.Projects;
            });



        }]);