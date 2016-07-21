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
    }
};