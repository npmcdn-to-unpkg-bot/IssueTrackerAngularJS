angular.module('issueTracker.projects')
    .factory('projectService', ['requester', 'identity',
        function name(requester, identity) {
            var url = 'projects/';

            return {
                getFilteredProjects: getFilteredProjects,
                getProjectById: getProjectById,
                addProject: addProject,
                editProject: editProject,
            }

            function getFilteredProjects(pageSize, pageNumber, filters) {
                var queryParams = {};

                queryParams.pageNumber = pageNumber;
                queryParams.pageSize = pageSize;
                queryParams.filter = filters;

                return requester.get(url, queryParams);
            }

            function getProjectById(projectId) {
                return requester.get(url + projectId);
            }

            function addProject(params) {

            }

            function editProject(params) {

            }
        }])