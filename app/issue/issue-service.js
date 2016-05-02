angular.module('issueTracker.issues')
    .factory('issueService', ['requester', 'identity',
        function name(requester, identity) {
            return {
                getIssuesByUser: getIssuesByUser,
                getIssuesByProject: getIssuesByProject,
                getIssueById: getIssueById,
                changeIssueStatus: changeIssueStatus,
                editIssue: editIssue,
                addIssue: addIssue,
                addComment: addComment,
                getCommentsByIssue: getCommentsByIssue
            }

            function getIssuesByUser() {
                return requester.get(
                    'issues/me?orderBy=DueDate desc, IssueKey&pageSize=20&pageNumber=1');
            }

            function getIssueById(params) {

            }

            function changeIssueStatus(params) {

            }

            function editIssue(params) {

            }

            function addIssue(params) {

            }

            function getCommentsByIssue(params) {

            }

            function addComment(params) {

            }
        }
    ]);