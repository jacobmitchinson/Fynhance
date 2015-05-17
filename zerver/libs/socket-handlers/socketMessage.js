module.exports = function(people, client) {

  client.on("message", function(company, market, shareAmount, price){
    socket.sockets.emit("chat", people[client.id], company, market, shareAmount, price);
  });

};
