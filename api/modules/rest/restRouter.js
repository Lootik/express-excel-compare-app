var express = require('express');
var compareController = require('./controllers/compareController');
var parseController = require('./controllers/parseController');
var router = express.Router();

//compare module
router.post('/compare', compareController.compare);
router.post('/compare/csv', compareController.compareCsv);
router.post('/compare-excel/by-sheets', compareController.compareBySheets);

//parse module
router.post('/parse-excel/cheets', parseController.parseExcelScheets);

module.exports = router;