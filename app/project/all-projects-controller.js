(function () {
    'use strict';

    angular.module('issueTracker.projects')
        .controller('AllProjectsController', [
            '$scope', 'projectService',
            function AllProjectsController($scope, projectService) {
                $scope.currentPage = 1;

                $scope.pageChange = function pageChange() {
                    projectService.getFilteredProjects(5, $scope.currentPage)
                        .then(function success(response) {
                            $scope.totalPages = response.TotalPages * 10;
                            $scope.projects = response.Projects;
                        });
                }

                $scope.pageChange();
            }]);
} ());
