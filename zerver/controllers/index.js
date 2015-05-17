module.exports = function(app) {

  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/manager', function(req, res) {
    res.render('manager');
  });

  app.get('trader', function(req, res) {
    res.render('trader');
  });
};