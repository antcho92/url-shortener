var express = require ('express');
var app = express();
var mongo = require('mongodb').MongoClient
var shortid = require('shortid');
var validUrl = require('valid-url');
var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/new/:url(*)', function(req, res, next) {
    res.send(req.params.url);
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
});