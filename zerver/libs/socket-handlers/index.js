// load dependencies
var io                = require('socket.io');
var socketJoin        = require('./_join');
var socketMessage     = require('./_message');
var socketDisconnect  = require('./_disconnect');
var socketUserList    = require('./_userList');

// private variables
var people            = {};

module.exports = function(server) {
  socket = io(server);
  socket.on("connection", function (client) {

    socketJoin(people, client);
    socketMessage(people, client);
    socketDisconnect(people, client);
    socketUserList(people,client);

  });
};