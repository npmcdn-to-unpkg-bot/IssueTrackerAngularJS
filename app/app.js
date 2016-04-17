'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'issueTracker.users'])
    
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
