'use strict';
var express        = require('express')
var app            = express()
var port           = process.env.PORT  || 3000
var config         = {
	control:  process.env.CACHE_CONTROL  || 30672000, // 0 = disable cache-control header/
	dir:      process.env.CACHE_DIR      || './tmp',
	logger:   console
}


var middleware = require('./')(config)

process.on('uncaughtException', function (err) {
	console.log('uncaughtExemption:', err)
	console.log('stack:', err.stack)
})

function logMiddleware(req, res, next) {
	console.log(req.url)
	next()
}

var express = require('express');
var app = express();

app.use(logMiddleware)

app.get('/', function(req, res) {
	var urls     = '/cdnjs:1140@2.0/.min.css,16pixels@0.1.5/.min.css'
	var template = '<body style="font-family:arial;padding-top:50px"><center>Example: <a href="$url">$url</a>'
	var page     = template.replace('$url', urls).replace('$url', urls)
  res.send(page)
})

app.use(middleware)

app.listen(port)
console.log('listening on', port)
