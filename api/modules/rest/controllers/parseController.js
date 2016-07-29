var multiparty = require('multiparty');
var _ = require('underscore');
var XLSX = require('xlsx');


module.exports = {
    parseExcelScheets: function (req, res) {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            var file = files.file;
            var workbook = XLSX.readFile(file[0].path);
            res.send({sheets: workbook.SheetNames});
        });
    }
};