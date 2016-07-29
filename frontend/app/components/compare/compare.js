require('./compare.scss');

(function () {
    angular.module('EC.compare', [])
        .directive('ecCompareList', ecCompareList)
        .directive('ecCompareWidget', compareWidget)
        .directive("fileModel", ['$parse', fileModel])
        .directive('ecCompareResult', ecCompareResult)
        .directive('ecCompareByWorksheet', ecCompareByWorksheet)
        .directive('ecCompareCsv', ecCompareCsv)
        .directive('ecCsvCompareResult', ecCsvCompareResult);
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
                    compareService.compareExelFiles(fd,
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

    function fileModel($parse, $scope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel),
                    modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
                scope.$on('clearFileModel', function (e, arg) {
                    if (attrs.fileModel === arg.fileModel) {
                        angular.element(element).val(null);
                    }
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

    function ecCompareByWorksheet() {
        return {
            restrict: 'E',
            template: require('./templates/compareByWorksheet.jade'),
            controller: function ($scope, $rootScope, compareService) {
                $scope.$watch('file1', function () {
                    $scope.difference = $scope.file1Sheets = null;
                    if ($scope.file1) {
                        if (!$scope.isExcelFile($scope.file1, 'file1')) {
                            $rootScope.$broadcast('clearFileModel', {fileModel: 'file1'});
                            alert('File should be .xls or .xlsx format!');
                            $scope.file1 = null;
                            return;
                        }
                        var fd = new FormData();
                        fd.append('file', $scope.file1);
                        compareService.getExcelFileSheets(fd,
                            function (res) {
                                $scope.file1Sheets = res.sheets;
                            },
                            function (err) {});
                    } else {
                        $scope.file1 = null;
                    }
                });
                $scope.$watch('file2', function () {
                    $scope.difference = $scope.file2Sheets = null;
                    if ($scope.file2) {
                        if (!$scope.isExcelFile($scope.file2, 'file2')) {
                            $rootScope.$broadcast('clearFileModel', {fileModel: 'file2'});
                            alert('File should be .xls or .xlsx format!');
                            $scope.file2 = null;
                            return;
                        }
                        var fd = new FormData();
                        fd.append('file', $scope.file2);
                        compareService.getExcelFileSheets(fd,
                            function (res) {
                                $scope.file2Sheets = res.sheets;
                            },
                            function (err) {});
                    } else {
                        $scope.file2 = null;
                    }
                });
                $scope.$watch('activeSheet1', function () {
                    $scope.difference = null;
                });
                $scope.$watch('activeSheet2', function () {
                    $scope.difference = null;
                });

                $scope.setActive = function (event, index, isFile1) {
                    isFile1 ? $scope.activeSheet1 = index : $scope.activeSheet2 = index;
                };

                $scope.isSheetsSelected = function () {
                    return _.isNumber($scope.activeSheet1) && _.isNumber($scope.activeSheet2);
                };
                $scope.compare = function () {
                    var fd = new FormData();
                    fd.append('file1', $scope.file1);
                    fd.append('file2', $scope.file2);
                    fd.append('file1Sheet', $scope.file1Sheets[$scope.activeSheet1]);
                    fd.append('file2Sheet', $scope.file2Sheets[$scope.activeSheet2]);
                    compareService.compareExelFilesBySheets(fd,
                        function (res) {
                            if (_.isEmpty(res.difference)) {
                                alert("These sheets are the same!");
                                $scope.difference = null;
                            } else {
                                $scope.difference = res.difference;
                                $scope.file1Name = res.file1Name;
                                $scope.file2Name = res.file2Name;
                            }

                        }, function (err) {});
                };
                $scope.isExcelFile = function (file) {
                    var re = /(.xls|.xlsx)$/;
                    var fileName = file.name;
                    return re.test(fileName);
                };
            }

        };
    }

    function ecCompareCsv() {
        return {
            restrict: 'E',
            template: require('./templates/compareCsv.jade'),
            controller: function ($scope, compareService) {
                $scope.test = function () {
                    $scope.differences = null;
                    var fd = new FormData();
                    var re = /.csv$/;
                    try {
                        var file1Name = $scope.compareFiles.file1.name;
                        var file2Name = $scope.compareFiles.file2.name;
                    } catch (err) {
                        alert('Two files should be specified');
                        return;
                    }
                    if (!re.test(file1Name) || !re.test(file2Name)) {
                        alert('Files should be .csv format!');
                        return;
                    }
                    fd.append('file1', $scope.compareFiles.file1);
                    fd.append('file2', $scope.compareFiles.file2);
                    compareService.compareCsv(fd,
                        function (res) {
                            var compareData = res.differences.data;
                            $scope.header = compareData[0];
                            var diffsClone = _.clone(compareData);
                            diffsClone.splice(0, 1);
                            $scope.differences = diffsClone;
                        }, function (err) {

                    });
                };
            }
        };
    }
    function ecCsvCompareResult() {
        return {
            restrict: 'E',
            template: require('./templates/CSVcpmpareResult.jade')
        };
    }
})();