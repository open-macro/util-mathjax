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
		old_file = './public/svg/' + req.body.svg_names[i] + '.svg'
		new_file = './public/svg/eqn' + pad(i,3) + '.svg'
		archive = './public/myfiles.zip';		
		copyAndZip(old_file, new_file, archive);
	}
	res.end();
});

app.post('/submit', function(req, res) {
  var fname = Math.random().toString(36).substring(7);
  mjAPI.typeset({
    math: req.body.math,
    format: "TeX",
    svg: true,
    ex: 6,
    width: 80,
    linebreaks: true
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

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function zipme(new_file, archive) {
	zip = spawn('zip', ['-j', archive, new_file]); 
	zip.stdout.on('data', function (data) {
		console.log('stdout [zip]: ' + data);
	});
	zip.stderr.on('data', function (data) {
		console.log('stderr [zip]: ' + data);
	});
	zip.on('close', function (code) {
		console.log('child process [zip] exited with code ' + code);
	});
}

function copyAndZip(old_file, new_file, archive) {
	cp = spawn('cp', [old_file, new_file]);
	cp.stdout.on('data', function(data) {
		console.log('stdout [cp]: ' + data);
	});
	cp.stderr.on('data', function(data) {
		console.log('stderr [cp]: ' + data);
	});
	cp.on('close', function(code) {
		console.log('child process [cp] exited with code ' + code);
		zipme(new_file, archive);
	});
}
