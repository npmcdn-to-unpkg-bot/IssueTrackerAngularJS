angular.module('issueTracker.projects')

    .controller('AllProjectsController', [
        '$scope', '$location', 'notifier', 'identity', 'authentication', 'issueService', 'projectService',
        function HomeController($scope, $location, notifier, identity, authentication, issueService, projectService) {
            $scope.currentPage = 1;

            $scope.pageChange = function () {
                projectService.getFilteredProjects(5, $scope.currentPage)
                    .then(function success(response) {
                        $scope.totalPages = response.TotalPages * 10;
                        $scope.projects = response.Projects;
                    });
            }
             $scope.pageChange();
            
        }]);
