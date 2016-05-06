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
                queryParams.filter = filters || 'Name.length > 0';

                return requester.get(url, queryParams);
            }

            function getProjectById(projectId) {
                return requester.get(url + projectId);
            }

            function addProject(project) {
                return requester.post(url, project);
            }

            function editProject(project) {
                return requester.put(url + project.Id, project);
            }
        }])