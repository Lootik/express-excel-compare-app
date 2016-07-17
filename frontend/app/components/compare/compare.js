angular.module('EC.compare', [])
    .directive('ecCompareWidget', compareWidget)
    .directive("fileModel", ['$parse', fileModel])
    .directive('ecCompareResult', ecCompareResult);

function compareWidget() {
    return {
        restrict: 'E',
        template: require('./templates/compareWidget.jade'),
        controller: function ($scope, compareService) {
            $scope.test = function () {
                var fd = new FormData();
                fd.append('file1', $scope.compareFiles.file1);
                fd.append('file2', $scope.compareFiles.file2);
                compareService.compareFiles(fd,
                    function (res) {
                        $scope.differences = res.differences;
                    }, function (err) {});
            };
        }
    };
}

function fileModel($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}

function ecCompareResult() {
    return {
        restrict: 'E',
        template: require('./templates/compareResultDiretive.jade')
    };

};


