module.exports = function(stores, client) {

  client.on('trader-join', function() {
    // get data
    client.emit('update-stores', stores);
  });

};
