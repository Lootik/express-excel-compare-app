

(function () {
    'use strict';
    angular.module('EC.header', [])
        .directive('ecHeader', ecHeader);
    
    function ecHeader() {
        return {
            restrict: 'E',
            template: require('./templates/header.jade'),
            controller: function ($scope, $state) {
                $scope.currentNavItem = 'compare';
                switch ($state.current.name) {
                    case 'main':
                        $scope.currentNavItem = 'main';
                        break;
                    case 'main.compareCsv':
                        $scope.currentNavItem = 'compareCsv';
                        break;
                }

            }
        };
    }
})();