var express = require ('express');
var app = express();
var mongo = require('mongodb').MongoClient
var port = process.env.PORT || 8080;



app.listen(port, function() {
    console.log('Listening on port ' + port);
})

var url = 'mongodb://localhost:27017/' + process.argv[2]
mongo.connect(url, function(err, db) {
  if (err) throw err
  
});