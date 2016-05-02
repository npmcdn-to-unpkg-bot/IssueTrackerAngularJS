angular.module('issueTracker.issues')
    .factory('issueService', ['requester', 'identity',
        function name(requester, identity) {
            var url = "issues/";
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

            function getIssueById(issueId) {
                return requester.get(url + issueId);
            }

            function changeIssueStatus(issueId, statusId) {
                return requester.put(url + issueId + '?changeStatus=' + statusId);
            }

            function editIssue(params) {
                return requester.put(url, issue);
            }

            function addIssue(issue) {
                return requester.post(url, issue);
            }

            function getCommentsByIssue(issueId) {
                return requester.get(url + issueId + '/comments');
            }

            function addComment(comment) {
                return requester.post(url + issueId + '/comments', comment);
            }
        }
    ]);