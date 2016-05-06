angular.module('issueTracker.issues')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:issueId/edit', {
            templateUrl: 'issue/edit-issue.html',
            controller: 'EditIsssueController',
        });
    }])
    .controller('EditIsssueController',
    ['$scope', '$location', '$routeParams', 'authentication', 'identity', 'issueService', 'labelsService', 'projectService', '$sce', '$q',
        function ($scope, $location, $routeParams, authentication, identity, issueService, labelsService, projectService, $sce, $q) {

            authentication.getAllUsers()
                .then(function (response) {
                    console.log(response);
                    $scope.users = response;
                });


            issueService.getIssueById($routeParams.issueId).then(
                function (response) {
                    console.log(response);
                    response.DueDate = new Date(response.DueDate);
                    response.Label = response.Labels.map(x => x.Name).join(", ");
                    $scope.issue = response;

                    projectService.getProjectById(response.Project.Id)
                        .then(function (response) {
                            console.log(response);
                            $scope.project = response;
                        });
                });



            $scope.openDate = function () {
                $scope.popup.opened = true;
            };

            $scope.popup = {
                opened: false
            };

            $scope.format = 'dd-MMMM-yyyy'

            $scope.editIssue = function (issueToAdd) {
                console.log(issueToAdd);
                issueToAdd.PriorityId = issueToAdd.Priority.Id;
                var labelsTemp = issueToAdd.Label.split(/,\s*/);
                issueToAdd.Labels = [];
                labelsTemp.forEach(function name(label) {
                    issueToAdd.Labels.push({ Name: label });
                });
                issueToAdd.AssigneeId = issueToAdd.Assignee.Id;
                delete issueToAdd.Label;
                delete issueToAdd.Assignee;
                delete issueToAdd.Priority;
                console.log(issueToAdd);
                issueService.editIssue(issueToAdd)
                    .then(function success(response) {
                        response.DueDate = new Date(response.DueDate);
                        response.Label = response.Labels.map(x => x.Name).join(", ");
                        $scope.issue = response;
                    });
            }

            $scope.dirty = {};

            var suggestLabelRemoteAndDelimited = function (term) {
                var ix = term.lastIndexOf(','),
                    lhs = term.substring(0, ix + 1),
                    rhs = term.substring(ix + 1),
                    deferred = $q.defer();

                deferred.resolve(labelsService.getFilteredLabels(rhs)
                    .then(function (response) {
                        var labels = response;
                        var result = [];
                        labels.forEach(function (l) {
                            result.push({ label: l.Name, value: lhs + l.Name });
                        });

                        return result;
                    }));

                return deferred.promise;
            };

            $scope.ac_option_delimited = {
                suggest: suggestLabelRemoteAndDelimited
            };
        }]);