var express = require('express');
var compareController = require('./controllers/compareController');
var router = express.Router();

router.post('/compare', compareController.compare);

module.exports = router;