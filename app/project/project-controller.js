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

            var model = {};
            model.Name = 'qqq project';
            model.Description = 'qqq project is qqq';
            model.ProjectKey = 'QP';
            model.Labels = [];
            model.Priorities = [];
            model.LeadId = '7bf29bd7-1845-471a-b445-12fad7fad45d';

            projectsService.addProject(model);
        }
    ])