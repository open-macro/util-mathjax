var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var mjAPI = require("./node_modules/mathjax-node/lib/mj-single.js");

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/submit', function(req, res) {
	console.log(req.body.tex)
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});