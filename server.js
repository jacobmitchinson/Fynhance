var app = require('express')();
var server = require('http').createServer(app).listen(3001, '::');
var path = require('path');
var express = require('express');

require('./zerver/controllers/index.js')(app);
require('./zerver/libs/socket-handlers')(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'www')));
app.use('/img', express.static(__dirname + '/www/img'));
app.use('/js', express.static(__dirname + '/www/js'));
app.use('/css', express.static(__dirname + '/www/css'));
