(function () {
    'use strict';

    angular.module('issueTracker.users.logout', [])
        .controller('LogoutController', ['$location', 'authentication', 'notifier',
            function ($location, authentication, notifier) {
                authentication.logout();
                notifier.success('Successfully logged out. Goodbye!');
                $location.path('/home');
            }
        ])
} ());