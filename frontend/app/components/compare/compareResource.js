var config = require('../../config.js');

EC.factory('compareResource', ['$resource', function ($resource) {
        return {
            compareFiles: function (params, success, error) {
                $resource(config.API + '/compare', {}, {
                    compare: {
                        method: 'POST',
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }
                }).compare(params, success, error);
            }
        };
    }]);