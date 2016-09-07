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
    }
    console.log('Successfully connected to MongoDB on port 27017.');
    var collection = db.collection('links');
    var params = req.params.url;

    var newLink = function(db, callback) {
      //checks for a valid url
      if (validUrl.isUri(params)) {
        //checks to see if website is in database already.
        collection.findOne({
          'url': params
        }, {
          'short': 1,
          '_id': 0
        }, function(err, doc) {
          if (err) throw err;
          if (doc != null) {
            console.log('Found previous shortlink. Reusing.');
            res.json({
              original_url: params,
              short_url: 'https://api-projects-antcho92.c9users.io/' + doc.short
            });
          } else {
            console.log('No previous shortlink found. Making a new one');
            var shortCode = shortid.generate();
            var newUrl = {
              url: params,
              short: shortCode
            };
            collection.insert([newUrl]);
            res.json({
              oiginal_url: params,
              short_url: 'https://api-projects-antcho92.c9users.io/' + shortCode
            });
          }
        });
      }
      else {
        res.json({
          error: "Wrong url format, make sure you have a valid protocol and real site."
        });
      }
    };
    newLink(db, function() {
      db.close();
    });
  });
});

// GET to handle redirecting from short URL
router.get('/:short', function(req, res) {
  mongo.connect('mongodb://localhost:27017/url-shortener', function(err, db) {
    if (err) {
      throw new Error('Database failed to connect!');
    }
    console.log('connected to server');
    var collection = db.collection('links');
    var params = req.params.short;
    var findLink = function(db, callback) {
      //searching collection to find the url of the 'short' property
      collection.findOne({
        'short': params
      }, {
        url: 1,
        _id: 0
      }, function(err, doc) {
        if (err) throw err;
        if (doc != null) {
          console.log('Redirectiong to shortlink URL: ' + doc.url);
          res.redirect(doc.url);
        }
        else {
          res.json({
            error: "No corresponding shortlink found in the database."
          });
        }
      });
    };
    findLink(db, function() {
      db.close;
    });
  });
});


module.exports = router;