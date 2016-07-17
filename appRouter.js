var express = require('express');
var restRouter = require('./api/modules/rest/restRouter');
var path = require('path');


module.exports = {
    listen: function (app) {
        app.use('/build', express.static('frontend/build'));
        app.use('/rest', restRouter);
        app.get('/*', function (req, res) {
            return res.sendFile(path.join(__dirname + '/frontend/app/index.html'));
        });
    }
};