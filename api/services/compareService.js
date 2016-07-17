var _ = require('underscore');

module.exports = {
    compare: function (workBook1, workBook2) {
        var result = [];
        workBookSheets1 = workBook1.Sheets;
        workBookSheets2 = workBook2.Sheets;
        _.each(workBookSheets1, function (pageData, index) {
            var fileResult = {},
                isDifferences = false;
            fileResult.idexes = [];
            fileResult.page = index;
            _.each(pageData, function (cellData, index) {
                var cellValue = cellData.v;
                if (cellValue !== workBookSheets2[fileResult.page][index].v) {
                    isDifferences = true;
                    fileResult.idexes.push({
                        index: index,
                        file1Value: {
                            value: cellValue
                        },
                        file2Value: {
                            value: workBookSheets2[fileResult.page][index].v
                        }
                    });
                }
            });
            isDifferences && result.push(fileResult);
            isDifferences = false;
        });
        return result;
    }
};