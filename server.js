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

app.post('/zip', function(req, res) {
  rm = spawn('rm', ['-f', './public/myfiles.zip']);
  for (var i=0; i<req.body.svg_names.length; i++) {
    zip = spawn('zip', ['-j', './public/myfiles.zip', 
      './public/svg/' + req.body.svg_names[i] + '.svg']); 
    zip.stdout.on('data', function (data) {
      //console.log('stdout: ' + data);
    });
    zip.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    zip.on('close', function (code) {
      //console.log('child process exited with code ' + code);
    });
  }
  res.end();
});

app.post('/submit', function(req, res) {
  var fname = Math.random().toString(36).substring(7);
  mjAPI.typeset({
    math: req.body.math,
    format: "TeX",
    svg: true,
  }, function (data) {
    if (!data.errors) {
      fs.writeFile("./public/svg/" + fname + ".svg", data.svg, function(err) {
        if(err) { return console.log(err); }
        res.json(
          {"idx": req.body.idx,
          "fname": fname}
        );
      });
    }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

