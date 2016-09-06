var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var shortid = require('shortid');
var validUrl = require('valid-url');

// GET home page
router.get('/', function(req, res, next) {
    res.render('index');
});

// GET to handle new links
router.get('/new/:url(*)', function(req, res, next) {
    //connect to mongodb and handle errors
    mongo.connect('mongodb://localhost:27017/url-shortener', function(err, db) {
      if (err) {
        throw new Error('Database failed to connect!');
      } else {
        console.log('Successfully connected to MongoDB on port 27017.');
        var collection = db.collection('links');
        var params = req.params.url;
        
        var newLink = function(db, callback) {
            var insertLink = { url: params, short: "test" };
            collection.insert([insertLink]);
            res.send(params);
        };
        newLink(db, function() {
            db.close();
        });
      }
    });
});


module.exports = router;