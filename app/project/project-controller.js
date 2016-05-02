angular.module('issueTracker.projects',
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
        $routeProvider.when('/projects', {
            templateUrl: 'project/project.html',
            controller: 'ProjectsController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/projects/:projectId', {
            templateUrl: 'project/project.html',
            controller: 'ProjectsController',
            resolve: routeChecks.authenticated
        })
    }
    ])
    .controller('ProjectsController', ['$scope', '$routeParams', 'projectService',
        function ($scope, $routeParams, projectsService) {
            var projectId = $routeParams.projectId;
            if (projectId) {
                console.log(projectsService.getProjectById(projectId));
            }

        }
    ])