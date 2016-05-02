'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'LocalStorageModule',
    'issueTracker.home',
    'issueTracker.common',
    'issueTracker.issues',
    'issueTracker.users.identity',
    'issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });

    }])
    .run(['authentication', function (authentication) {
        authentication.refreshCookie();
    }])
    .constant('BASE_URL',
    'http://softuni-issue-tracker.azurewebsites.net');

