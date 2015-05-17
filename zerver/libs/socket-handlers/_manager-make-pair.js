module.exports = function(stores, client) {

  client.on('manager-make-pair', function(trader1Id, trader2Id) {
    //TODO
    // 1. update pairing data
    // 1.a remove old pairings
    var traders = stores.traders;
    var trader1 = traders[trader1Id];
    var trader2 = traders[trader2Id];
    if ( ! trader1 || ! trader2) return;  // error

    if (trader1.pair) {
      var trader1PairTrader = traders[trader1.pair];
      if (trader1PairTrader) {
        trader1PairTrader.pair = false;
      }
    }
    if (trader2.pair) {
      var trader2PairTrader = traders[trader2.pair];
      if (trader2PairTrader) {
        trader2PairTrader.pair = false;
      }
    }

    var pairs = stores.pairs;
    for (var key in pairs) {
      var pair = pairs[key];
      if (pair[trader1Id] || pair[trader2Id]) {
        delete pairs[key];
      }
    }
    //  1.b make new pairing
    trader1.pair = trader2Id;
    trader2.pair = trader1Id;
    pairs[trader1Id + '-' + trader2Id] = { trader1Id: true, trader2Id: true };

    // 2. broadcast pairing data.
    client.broadcast.emit('update-pairs', pairs);
  });

};
