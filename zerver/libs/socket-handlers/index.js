// load dependencies
var io                = require('socket.io');
var socketJoin        = require('./_legacy-join');
var socketMessage     = require('./_legacy-message');
var socketDisconnect  = require('./_legacy-disconnect');
var socketUserList    = require('./_legacy-userList');
var people            = {};

var socketManagerJoin = require('./_manager-join');
var socketManagerMakePair = require('./_manager-make-pair');
var socketTraderJoin  = require('./_trader-join');
var socketTraderMakeTrade = require('./_trader-make-trade');
var socketTraderTradeResponse = require('./_trader-trade-response');

// private variables
var stores = {
  traders: {},  // list of objects
  pairs: {},  // list of id tuples
  trades: {}  // list of objects
};

module.exports = function(server) {
  socket = io(server);
  socket.on("connection", function (client) {

    socketJoin(people, client);
    socketMessage(people, client);
    socketDisconnect(people, client);
    socketUserList(people,client);

    socketManagerJoin(stores, client);
    socketManagerMakePair(stores, client);
    socketTraderJoin(stores, client);
    socketTraderMakeTrade(stores, client);
    socketTraderTradeResponse(stores, client);
  });
};