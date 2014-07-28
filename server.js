var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost/notes-development');
require('./api/routes/noteRoutes')(app);

app.use(express.static('dist/'));


var server = http.createServer(app);
server.listen(3000, function() {
  console.log('server started on port 3000');
});
