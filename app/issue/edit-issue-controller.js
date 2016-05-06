angular.module('issueTracker.issues')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:issueId/edit', {
            templateUrl: 'issue/edit-issue.html',
            controller: 'EditIsssueController',
        });
    }])
    .controller('EditIsssueController',
    ['$scope', '$location', '$routeParams', 'identity', 'issueService',
        function ($scope, $location, $routeParams, identity, issueService) {
            issueService.getIssueById($routeParams.issueId).then(
                function (response) {
                    $scope.issue = response;
                });

            $scope.open1 = function () {
                $scope.popup1.opened = true;
            };

            $scope.popup1 = {
                opened: false
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            $scope.editIssue = function () {
                updated = {};
                updated.Id = $scope.issue.Id;
                updated.Title = $scope.issue.Title;
                updated.Description = $scope.issue.Description;
                updated.DueDate = $scope.issue.DueDate;
                updated.ProjectId = $scope.issue.Project.Id;
                updated.AssigneeID = $scope.issue.Assignee.Id;
                updated.PriorityID = $scope.issue.Priority.Id;
                updated.Labels = $scope.issue.Labels;


                console.log($scope.issue);
                issueService.editIssue(updated);
            }
        }]);