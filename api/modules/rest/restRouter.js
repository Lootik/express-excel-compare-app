var express = require('express');
var compareController = require('./controllers/compareController');
var router = express.Router();

router.post('/compare', compareController.compare);
router.post('/compare/csv', compareController.compareCsv);

module.exports = router;