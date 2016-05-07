'use strict';

angular.module('issueTracker.issues', []);

angular.module('issueTracker', [
    'ngRoute',
    'ui.bootstrap.tpls',
    'ui.bootstrap.datepickerPopup',
    'ui.bootstrap.pagination',
    'angular-loading-bar',
    'LocalStorageModule',
    'MassAutoComplete',
    'ngSanitize',
    'toastr',
    'issueTracker.home',
    'issueTracker.common',
    'issueTracker.filters',
    'issueTracker.labels',
    'issueTracker.comments',
    'issueTracker.issues',
    'issueTracker.projects',
    'issueTracker.users.logout',
    'issueTracker.users.identity',
    'issueTracker.users.authentication',
    'issueTracker.users.profile'
])

    .config(['$routeProvider', function ($routeProvider) {

        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAuthenticated()) {
                    return $q.when(true);
                }
                return $q.reject('Unauthorized Access');
            }],
            isAdmin: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isAdmin()) {
                    return $q.when(true);
                }
                return $q.reject('Must be admin');
            }]
        }

        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController',
        })

        $routeProvider.when('/issue/:issueId', {
            templateUrl: 'issue/view-issue.html',
            controller: 'ViewIsssueController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/issue/:issueId/edit', {
            templateUrl: 'issue/edit-issue.html',
            controller: 'EditIsssueController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/project/add', {
            templateUrl: 'project/add-project.html',
            controller: 'AddProjectController',
            resolve: routeChecks
        });

        $routeProvider.when('/projects/:projectId', {
            templateUrl: 'project/view-project.html',
            controller: 'ViewProjectController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/projects/:projectId/edit', {
            templateUrl: 'project/edit-project.html',
            controller: 'EditProjectController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/projects/:projectId/add-issue', {
            templateUrl: 'issue/add-issue.html',
            controller: 'AddIsssueController',
        });

        $routeProvider.when('/projects', {
            templateUrl: 'project/all-projects.html',
            controller: 'AllProjectsController',
            resolve: routeChecks
        })

        $routeProvider.when('/logout', {
            controller: 'LogoutController',
            templateUrl: 'users/logout.html',
        });

        $routeProvider.when('/profile/password', {
            controller: 'ProfileController',
            templateUrl: 'users/profile.html',
            resolve: routeChecks.isAuthenticated
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    .run(['$rootScope', '$location', 'authentication', 'notifier', function ($rootScope, $location, authentication, notifier) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                notifier.error("You must be logged in to access this page.");
                $location.path('/');
            }
            if (rejection == 'Must be admin') {
                notifier.error("You dont have rights to access this page.");
                $location.path('/');
            }
        });
        authentication.refreshAuthorization();
    }])
    .constant('BASE_URL',
    'http://softuni-issue-tracker.azurewebsites.net');

