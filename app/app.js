'use strict';

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
        
        $routeProvider.when('/projects', {
            templateUrl: 'project/all-projects.html',
            controller: 'AllProjectsController',
            resolve: routeChecks
        })

        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    .run(['$rootScope', '$location', 'authentication','notifier', function ($rootScope, $location, authentication, notifier) {
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

