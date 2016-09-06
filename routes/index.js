var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var shortid = require('shortid');
var validUrl = require('valid-url');

// GET home page
router.get('/', function(req, res, next) {
    res.render('index');
});

// GET new link
router.get('/new/:url(*)', function(req, res, next) {
    res.send(req.params.url);
});

module.exports = router;