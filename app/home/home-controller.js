angular.module('issueTracker.home', [])
    .controller('HomeController', [
        '$scope', '$location', 'notifier', 'identity', 'authentication', 'issueService', 'projectService',
        function HomeController($scope, $location, notifier, identity, authentication, issueService, projectService) {

            $scope.isAuthenticated = authentication.isAuthenticated();
            $scope.loginMode = true;
            $scope.toggleLogin = toggleLogin;

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (params) {
                        notifier.success('Successfully logged in!');
                        $location.path("/");
                    }, function error() {
                        notifier.error('Invalid login details!');
                    });
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function success() {
                        notifier.success('Successfully registered!');

                        var userToLogIn = {};
                        userToLogIn.email = user.Email;
                        userToLogIn.password = user.Password;
                        $scope.login(userToLogIn);
                    }, function error() {
                        notifier.error('Invalid register details!');
                    });
            };

            function toggleLogin() {
                $scope.loginMode = !$scope.loginMode;
            }
            if (authentication.isAuthenticated()) {
                $scope.viewProject = function (projectId) {
                    $location.path('/projects/' + projectId);
                }
                var projectIds = [];
                var projectsWithIssues = [];

                issueService.getIssuesByUser().then(function (response) {
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
                            });
                    });

                    $scope.projectsByIssue = projectsWithIssues;
                });

                filters = [];
                var username = identity.getUserData().Username;
                filters.push('Lead.Username == ' + '"' + username + '"')

                projectService.getFilteredProjects(20, 1, filters).then(function (response) {
                    $scope.projects = response.Projects;
                });
            }
        }
    ]);