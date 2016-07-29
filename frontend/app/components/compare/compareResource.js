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
            compareExelFilesBySheets: function (params, success, error) {
                $resource(config.API + '/compare-excel/by-sheets', {}, {
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
            },
            getExcelFileSheets: function (params, success, error) {
                $resource(config.API + '/parse-excel/cheets', {}, {
                    fetch: {
                        method: 'POST',
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }
                }).fetch(params, success, error);
            }

        };
    }]);