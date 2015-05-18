var app = require('express')();
var server = require('http').createServer(app).listen(3001, '::');
var path = require('path');
var express = require('express');

require('./app/controllers/index.js')(app);
require('./app/controllers/manager.js')(app);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/www/js'));
app.use('/css', express.static(__dirname + '/public/css'));
