$(document).ready(function() {
  var socket = io();
  var localStores = {};

  function onUpdateStores(stores) {
    var $tradersContainer = $('.traders-container');

    // handle traders
    var traders = stores.traders;
    localStores = stores;
    $tradersContainer.html('');  //TODO, handle frontend model

    for (var key in traders) {
      var trader = traders[key];
      var traderHtml = '<div class="trader-container" data-id="' + key + '">'
          + '<div class="trader-name">' + trader.name + '</div>'
        + '</div>';
      $tradersContainer.append($(traderHtml));
    }

    onUpdatePairs(stores.pairs);

    initListeners(socket);
  }

  function onUpdatePairs(pairs) {
console.log('hello 0c');
console.log(pairs);
    var $pairsContainer = $('.pairs-container');

    // handle pairs
    $pairsContainer.html('');  // hack, no FE model structure

    for (var key in pairs) {
      var pair = pairs[key];
      var pairKeys = Object.keys(pair);
      var localTraders = localStores.traders;
      var pairHtml = '<div class="pair-container">'
          + '<div class="pair-1-name">' + localTraders[pairKeys[0]].name + '</div>'
          + '<div class="pair-link"> || </div>'
          + '<div class="pair-2-name">' + localTraders[pairKeys[1]].name + '</div>'
        + '</div>';
      $pairsContainer.append($(pairHtml));
    }
  }

  socket.on('update-stores', onUpdateStores);  // update everything
  socket.on('update-pairs', onUpdatePairs);  // update pairs data only
  socket.emit('manager-join');
});

function initListeners(socket) {
  var selected1 = null,
      selected2 = null;

  $('.trader-container').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);
    var traderId = $this.data('id');

    if ($this.hasClass('selected')) {
      // unselect
      if (selected1 == traderId) {
        selected1 = selected2;
        selected2 = false;
      } else if (selected2 == traderId) {
        selected2 = false;
      }
      $this.removeClass('selected');
    } else {
      // select
      if ( ! selected1) {
        selected1 = traderId;
      } else if ( ! selected2) {
        selected2 = traderId;
      } else {
        // unselect selected1
        $('.trader-container.selected[data-id="' +  selected1 + '"]').removeClass('selected');
        selected1 = selected2;
        selected2 = traderId;
      }
      $this.addClass('selected');
    }
  });

  $('.btn-pair-up').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

console.log('hello 0a');
    if (selected1 && selected2) {
console.log('hello 0b');
      socket.emit('manager-make-pair', selected1, selected2);
    }
  })
}