module.exports = function(stores, client) {

  client.on('trader-make-trade', function(traderId, company, market, amount, price, contextData) {
    // 1. check if trader is paired
    var traders = stores.traders;
    var trader = traders[traderId];
    if ( ! trader) return;  // error

    // 1. make new trade, status new
    var trades = stores.trades;
    var newTradeId = (new Date()).getTime();
    var newTrade = {
      traderId: traderId,
      company: company,
      market: market,
      amount: amount,
      price: price,
      data: contextData,
      status: 'new'
    };
    trades[newTradeId] = newTrade;

    // 2. set to approve by default after timer
    if (trader.paired) {
      var timeWindow = 300;  // 5 minutes

      newTrade.timeWindowTimer = setTimeout(function() {
        newTrade.status = 'defaut';
        client.broadcast.emit('update-trades', trades);  // update again if changed by default
      }, timeWindow * 1000);
      newTrade.timeWindow = timeWindow;
    } else {
      newTrade.status = 'complete';
    }

    // 3. broadcast (actually should only send to pair)
    client.broadcast.emit('update-trades', trades);
  });

};
