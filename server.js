"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
var http = require('http');
var fs = require('fs');
var port = 3002;
var stylesheet = fs.readFileSync('gallery.css');
var imageNames = ['ace', 'bubble', 'chess', 'fern', 'mobile'];

function serveImage(filename, req, res) {
	var body = fs.readFile('images/'+filename, function(err, body) {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.statusMessage = "whoops";
			res.end("Silly me");
			return;
		}
	res.setHeader("Content-Type", "image/jpg");
	res.end(body);
	});
}

var server = http.createServer((req, res) => {
	switch(req.url) {
		case "/chess":
			serveImage('chess.jpg', req, res);
			break;
		case "/ace":
			serveImage('ace.jpg', req, res);
			break;
		case "/bubble":
			serveImage('bubble.jpg', req, res);
			break;
		case "/fern":
		case "/fern/":
		case "/fern.jpg":
		case "/fern/jpeg":
			serveImage('fern.jpg', req, res);
			break;
		case "/mobile":
			serveImage('mobile.jpg', req, res);
			break;
		case "/gallery":
			var gHtml = imageNames.map(function(fileName){
				return '<img src="' + fileName + '"alt="a fishing ace at work">';
			}).join('');
			var html = '<!doctype html>';
			html += '<head><title>Gallery</title><link href="gallery.css" rel="stylesheet" type="text/css"></head>';
			html += '<body>';
			html += '<h1>Gallery</h1>';
			html += gHtml;
			html += '<h1>Hello.</h1> The time is ' + Date.now();
			html += '</body>';
			res.setHeader('Content-Type', 'text/html');
			res.end(html);
			break;
		case "/gallery.css":
			res.setHeader('Content-Type', 'text/css');
			res.end(stylesheet);
			break;
		default:
			res.statusCode = 404;
			res.statusMessage = "Not Found";
			res.end();
	}
});

server.listen(port, () => {
	console.log("Listening on Port "+ port);
});

