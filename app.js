var express = require ('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var path = require('path');
var logger = require('morgan');
var port = process.env.PORT || 8080;

var routes = require('./routes/index.js');

//connect to mongodb and handle errors
mongo.connect('mongodb://localhost:27017/learnyoumongo', function(err, db) {
  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use('/', routes);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});