angular.module('issueTracker.home', [
    'issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/login.html',
            controller: 'HomeController',
        })
    }])

    .controller('HomeController', [
        '$scope', '$location', 'identity', 'authentication', 'issueService', 'projectService',
        function HomeController($scope, $location, identity, authentication, issueService, projectService) {
            var loginMode = true;
            $scope.isAuthenticated = authentication.isAuthenticated();
            $scope.loginMode = loginMode;
            $scope.toggleLogin = toggleLogin;
            $scope.login = function (user) {

                console.log(user);

                authentication.loginUser(user)
                    .then(function (params) {
                        $location.path("/issues");
                    });
            };

            function toggleLogin() {
                loginMode = !loginMode;
                $scope.loginMode = loginMode;
            }
            if (authentication.isAuthenticated()){
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
            }
        }
    ]);