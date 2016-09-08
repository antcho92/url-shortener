var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var port = process.env.PORT || 8080;

var routes = require('./routes/index.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
});