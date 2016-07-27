var config = require('../../config.js');

EC.factory('compareResource', ['$resource', function ($resource) {
        return {
            compareExcelFiles: function (params, success, error) {
                $resource(config.API + '/compare', {}, {
                    compare: {
                        method: 'POST',
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }
                }).compare(params, success, error);
            },
            compareCsvFiles: function (params, success, error) {
                $resource(config.API + '/compare/csv', {}, {
                    compare: {
                        method: 'POST',
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }
                }).compare(params, success, error);
            }
        };
    }]);