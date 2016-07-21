var _ = require('underscore');
module.exports = {
    possiblePrefixes: [
        'output_'
    ],
    compare: function (workBook1, workBook2) {
        var result = [],
            me = this;
        var isDifferences = false;
        workBookSheets1 = workBook1.Sheets;
        workBookSheets2 = workBook2.Sheets;
        var fileResult = {};
        fileResult.idexes = [];
        var commonIndexesData = [];
        var commonSheets = this.getСommonSheets(workBook1, workBook2);
        if (_.isEmpty(commonSheets)) {
            return false;
        }
        _.each(commonSheets, function (commonSheet) {
            var sheetName1 = null,
                sheetName2 = null;

            if (typeof commonSheet === 'object') {
                isDifferent = true;
                sheetName1 = commonSheet.realSheetName;
                sheetName2 = commonSheet.commonSheetName;
            } else {
                sheetName1 = sheetName2 = commonSheet;
            }
            commonIndexesData.push(me.getCommonIndexes(sheetName1, sheetName2, workBookSheets1, workBookSheets2));
        });
        _.each(commonIndexesData, function (commonIndexData) {
            fileResult.sheets = {
                file1SheetName: commonIndexData.sheetName1,
                file2SheetName: commonIndexData.sheetName2
            };
            _.each(commonIndexData.indexes, function (index) {
                var file1CellValue = workBook1.Sheets[commonIndexData.sheetName1][index];
                var file2CellValue = workBook2.Sheets[commonIndexData.sheetName2][index];
                if (file1CellValue.v !== file2CellValue.v) {
                    isDifferences = true;
                    fileResult.idexes.push(
                        {
                            index: index,
                            file1Value: {
                                value: file1CellValue.v
                            },
                            file2Value: {
                                value: file2CellValue.v
                            }
                        });
                }
            });
            isDifferences && result.push(fileResult);
        });
        return result;
    },
    getCommonIndexes: function (sheetName1, sheetName2, workBookSheets1, workBookSheets2) {
        var indexes1 = _.keys(workBookSheets1[sheetName1]);
        var indexes2 = _.keys(workBookSheets2[sheetName2]);
        commonIndexes = _.union(indexes1, indexes2);
        return {
            sheetName1: sheetName1,
            sheetName2: sheetName2,
            indexes: commonIndexes
        };
    },
    getСommonSheets: function (workBook1, workBook2) {
        if (_.isEmpty(workBook1.SheetNames) || _.isEmpty(workBook2.SheetNames)) {
            return  false;
        }
        var workBookSheets1 = workBook1.SheetNames;
        var workBookSheets2 = workBook2.SheetNames;
        var commonSheets = this.compareSheets(workBookSheets1, workBookSheets2);
        return commonSheets;
    },
    compareSheets: function (sheetNames1, sheetNames2) {
        var result = [],
            me = this;
        _.each(sheetNames1, function (sheetName1) {
            _.each(sheetNames2, function (sheetName2) {
                if (sheetName1 === sheetName2) {
                    result.push(sheetName1);
                }
                if (me.possiblePrefixes[0] + sheetName1 === sheetName2) {
                    result.push({
                        realSheetName: sheetName1,
                        commonSheetName: sheetName2
                    });
                }
            });
        });
        return result;
    }


};