module.exports = function(app) {
  var namesArray = ["David", "Tom", "Dave", "Dmitri", "Kirsty", "Jules", "Jonny"]

  app.get('/', function(req, res){
    var randIndex = Math.floor(Math.random() * namesArray.length);
    var clientName = namesArray.splice(randIndex, 1);
    res.render('index', { clientName: clientName });
  });

};
  app.get('/manager', function(req, res) {
    res.render('manager');
  });

  app.get('trader', function(req, res) {
    res.render('trader');
  });
};
