var _ = require('underscore');
var fs = require('fs');
var coopy = require('coopyhx');
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
    },
    // CSV
    compareCsv: function (csv1, csv2) {
        var parsedFile1 = this.parseCsv(csv1);
        var parsedFile2 = this.parseCsv(csv2);
        var table1 = new coopy.CoopyTableView(parsedFile1);
        var table2 = new coopy.CoopyTableView(parsedFile2);
        var alignment = coopy.compareTables(table1, table2).align();
        var data_diff = [];
        var table_diff = new coopy.CoopyTableView(data_diff);
        var flags = new coopy.CompareFlags();
        flags.always_show_order = true;
        flags.show_unchanged_columns = true;
        flags.show_unchanged = true;
        var highlighter = new coopy.TableDiff(alignment, flags);
        highlighter.hilite(table_diff);
        return table_diff;
    },
    parseCsv: function (csv) {
        var result = [];
        var fileArray = fs.readFileSync(csv[0].path).toString().split("\n");
        _.each(fileArray, function (fileLine) {
            result.push(fileLine.split(','));
        });
        return result;
    },
    compareBySheet: function (workbook1, workbook2, workbook1Sheet, workbook2Sheet) {
        var me = this,
            workBook1Data = workbook1.Sheets[workbook1Sheet],
            workBook2Data = workbook2.Sheets[workbook2Sheet],
            commonIndexes = this.getCommonSheetIndexes(workBook1Data, workBook2Data),
            result = [];
        _.each(commonIndexes, function (index) {
            var isSetFile1Cell = !_.isEmpty(workBook1Data[index]);
            var isSetFile2Cell = !_.isEmpty(workBook2Data[index]);
            var file1Value = isSetFile1Cell && workBook1Data[index].v ? workBook1Data[index].v : 'NULL';
            var file2Value = isSetFile2Cell && workBook2Data[index].v ? workBook2Data[index].v : 'NULL';
            if (file1Value != file2Value) {
                result.push(me.buildCellCompareResult(index, file1Value, file2Value));
            }
        });
        return result;
    },
    getCommonSheetIndexes: function (workBook1Data, workBook2Data) {
        return  _.union(this.parseKeys(workBook1Data), this.parseKeys(workBook2Data));
    },
    parseKeys: function (obj) {
        return _.keys(obj);
    },
    buildCellCompareResult: function (index, cell1Value, cell2Value) {
        return {
            index: index,
            file1Value: cell1Value,
            file2Value: cell2Value
        };
    }
};