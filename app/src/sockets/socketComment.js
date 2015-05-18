module.exports = function(people, client) {

  client.on("comment", function(message, ticketID){
    socket.sockets.emit("comment", people[client.id], message, ticketID);
  });

};
