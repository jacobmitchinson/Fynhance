module.exports = function(stores, client) {

  client.on('trader-make-response', function(tradeId, reviewerId, tradeResponse) {
    //TODO
    // 1. check if trade exists
    var trades = stores.trades;
    trade = trades[tradeId];
    if ( ! trade) return;  // error
    if (trade.status != 'new' && trade.status != 'extended') return;  // trade already completed

    // 2. update trade
    if (trade.timeWindowTimer) clearTimeout(trade.timeWindowTimer);

    switch (tradeResponse) {
      case 'approve':
        trade.status = 'approved';
        trade.reviewedBy = reviewerId;
        break;
      case 'disapprove':
        trade.status = 'disapproved';
        trade.reviewedBy = reviewerId;
        break;
      case 'extend':
        trade.status = 'extended';
        trade.reviewedBy = reviewerId;

        var timeWindow = 3600;  // hack, defualt 1 hour, instead of user selected

        trade.timeWindowTimer = setTimeout(function() {
          trade.status = 'defaut';
          client.broadcast.emit('update-trades', trades);  // update again if changed by default
        }, timeWindow * 1000);
        trade.timeWindow = timeWindow;
        break;
    }

    // 3. broadcast (actually should only send to pair)
    client.broadcast.emit('update-trades', trades);    
  });

};
