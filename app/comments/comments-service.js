angular.module('issueTracker.comments', [])
    .factory('commentsService', ['requester',
        function name(requester) {
            var url = 'issues/';
            var url2 = '/comments/';

            return {
                getIssueComments: getIssueComments,
                addCommentToIssue: addCommentToIssue
            }

            function getIssueComments(issueId) {
                return requester
                    .get(url + issueId + url2);
            }

            function addCommentToIssue(issueId, comment) {
                return requester
                    .post(url + issueId + url2, comment);
            }
        }]);