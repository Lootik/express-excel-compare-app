var multiparty = require('multiparty');
var _ = require('underscore');
var XLSX = require('xlsx');
var compareService = require('../../../services/compareService');


module.exports = {
    compare: function (req, res) {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            var file1 = files.file1,
                file2 = files.file2;
            workbook1 = XLSX.readFile(file1[0].path),
                workbook2 = XLSX.readFile(file2[0].path);
            var result = compareService.compare(workbook1, workbook2);
            res.send({differences: result});
        });
    },
    compareCsv: function (req, res) {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            var file1 = files.file1,
                file2 = files.file2;
            var result = compareService.compareCsv(file1, file2);
            res.send({differences: result});
        });
    },
    compareBySheets: function (req, res) {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            file1 = files.file1,
                file2 = files.file2,
                file1SheetName = fields.file1Sheet[0],
                file2SheetName = fields.file2Sheet[0],
                workbook1 = XLSX.readFile(file1[0].path),
                workbook2 = XLSX.readFile(file2[0].path),
                difference = compareService.compareBySheet(workbook1, workbook2, file1SheetName, file2SheetName);
            file1Name = file1[0].originalFilename;
            file2Name = file2[0].originalFilename;
            res.send({
                file1Name:file1Name,
                file2Name:file2Name,
                difference: difference
            });
        });

    }
};