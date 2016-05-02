'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'angular-loading-bar',
    'LocalStorageModule',
    'issueTracker.home',
    'issueTracker.common',
    'issueTracker.issues',
    'issueTracker.projects',
    'issueTracker.users.identity',
    'issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });




    }])
    .run(['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('/');
            }
        });
        authentication.refreshAuthorization();
    }])
    .constant('BASE_URL',
    'http://softuni-issue-tracker.azurewebsites.net');

