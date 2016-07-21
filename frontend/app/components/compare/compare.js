(function () {
    angular.module('EC.compare', [])
        .directive('ecCompareList', ecCompareList)
        .directive('ecCompareWidget', compareWidget)
        .directive("fileModel", ['$parse', fileModel])
        .directive('ecCompareResult', ecCompareResult);

    function ecCompareList() {
        return {
            restrict: 'E',
            template: require('./templates/compareList.jade')
        };
    }

    function compareWidget() {
        return {
            restrict: 'E',
            template: require('./templates/compareWidget.jade'),
            controller: function ($scope, compareService) {
                $scope.test = function () {
                    $scope.differences = null;
                    var fd = new FormData();
                    var re = /(.xls|.xlsx)$/;
                    try {
                        var file1Name = $scope.compareFiles.file1.name;
                        var file2Name = $scope.compareFiles.file2.name;
                    } catch (err) {
                        alert('Two files should be specified');
                        return;
                    }
                    if (!re.test(file1Name) || !re.test(file2Name)) {
                        alert('Files should be .xls or .xlsx format!');
                        return;
                    }
                    fd.append('file1', $scope.compareFiles.file1);
                    fd.append('file2', $scope.compareFiles.file2);
                    compareService.compareFiles(fd,
                        function (res) {
                            if (res.differences === false) {
                                alert('Can not compare files, they have too different structure');
                                return;
                            }
                            if (_.isEmpty(res.differences)) {
                                alert("These files are the same");
                            } else {
                                $scope.differences = res.differences;
                            }

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
    }

})();