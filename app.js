var express = require('express');
var fs = require('fs');
var app = express();
var appRouter = require('./appRouter');
var bodyParser = require('body-parser');




app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));

appRouter.listen(app);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});