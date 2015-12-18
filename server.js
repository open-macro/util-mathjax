var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var spawn = require('child_process').spawn;
var fs = require('fs');

var mjAPI = require("./node_modules/mathjax-node/lib/mj-single.js");
mjAPI.start();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/submit', function(req, res) {
  console.log(req.body.math);
  mjAPI.typeset({
    math: req.body.math,
    format: "TeX",
    svg: true,
  }, function (data) {
    if (!data.errors) {
      fs.writeFile('./public/svg/foo.svg', data.svg, function(err) {
        if(err) { return console.log(err); }
        console.log('File saved')
      });
    }
  });
  res.end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

