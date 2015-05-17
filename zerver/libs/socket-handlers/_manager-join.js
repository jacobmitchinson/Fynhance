var defaultTraders = {
  t1: {
    name: 'Jason Stewart',
    pair: 't3',
    years: 4
  },
  t2: {
    name: 'Mason Stewart',
    pair: 't4',
    years: 3
  },
  t3: {
    name: 'Samuel Joel',
    pair: 't1',
    years: 1
  },
  t4: {
    name: 'Samantha Joel',
    pair: 't2',
    years: 1
  },
  t5: {
    name: 'Billy Belson',
    pair: false,
    years: 3
  },
  t6: {
    name: 'Billy Nelson',
    pair: false,
    years: 3
  },
  t7: {
    name: 'Billy Telson',
    pair: false,
    years: 1
  }
};

var defaultPairs = {};
defaultPairs[t1 + '-' + t3] = { t1: true, t3: true };
defaultPairs[t2 + '-' + t4] = { t2: true, t4: true },

var defaultTrades = {

};

module.exports = function(stores, client) {

  client.on('manager-join', function() {
    // 1. initialize data structure
    stores.traders = defaultTraders;
    stores.pairs = defaultPairs;
    stores.trades = defaultTrades;

    // 2. return data structure to manager
    client.broadcast.emit('update-store', stores);
  });

};
