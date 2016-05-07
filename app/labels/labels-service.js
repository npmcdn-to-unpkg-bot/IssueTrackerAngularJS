(function () {
    'use strict';

    angular.module('issueTracker.labels', [])
        .factory('labelsService', ['requester',
            function labelsService(requester) {
                var url = 'labels/';

                return {
                    getFilteredLabels: getFilteredLabels,
                }

                function getFilteredLabels(name) {
                    var queryParams = {};
                    queryParams.filter = name;

                    return requester.get(url, queryParams);
                }
            }]);
} ());