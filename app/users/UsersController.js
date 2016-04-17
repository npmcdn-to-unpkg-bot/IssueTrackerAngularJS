angular.module('issueTracker.users',[])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
             templateUrl: 'users/users.html',
             contoler: 'UsersController',
             })
    }])
    
    .controller('UsersController', [function(){}])