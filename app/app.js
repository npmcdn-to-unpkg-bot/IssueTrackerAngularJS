'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'LocalStorageModule',
    'issueTracker.home',
    'issueTracker.common',
    'issueTracker.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    .constant('BASE_URL',
    'http://softuni-issue-tracker.azurewebsites.net');

