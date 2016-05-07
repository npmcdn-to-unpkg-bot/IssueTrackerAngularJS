(function () {
    'use strict';

    angular.module('issueTracker.users.profile',
        ['issueTracker.users.authentication'])

        .config(['$routeProvider', function ($routeProvider) {
            
        }])
        .controller('ProfileController', ['$scope', '$location', 'authentication', 'notifier',
            function ($scope, $location, authentication, notifier) {

                $scope.changePassword = function changePassword(data) {
                    authentication.changePassword(data)
                        .then(function success(params) {
                            notifier.success('Successfully changed password!');
                            $location.path('/');
                        });

                }


            }
        ])
} ());