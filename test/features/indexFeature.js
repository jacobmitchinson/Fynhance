var expect = require('chai').expect;
var webdriverio = require ('webdriverio');

describe('Homepage', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome'}});
    client.init(done)
  });

  after(function(done) {
    client.end(done)
  });

  it('should let a user know when a message has been sent', function(done){
    client
    .url('http://localhost:3001')
    .setValue('#msg', 'Hi from Clint')
    .click('#send')
    .getText('#msgs', function(err, text){
      expect(text).to.contain('Hi from Clint')
    })
    .call(done);
  });

  it('should let a user know who is talking', function(done) {
    client
    .url('http://localhost:3001')
    .click('#send')
    .getText('#msgs', function(err, text){
      expect(text).to.contain('Tom:')
    })
    .call(done);
  });

  it('should tell user when it has connected', function(done) {
    client
      .url('http://localhost:3001')
      .getText('#msgs', function(err, text){
        expect(text).to.contain('You have connected to the server.')
      })
      .call(done);
  });

  it('should let users know when a new user joins', function(done) {
    client
      .url('http://localhost:3001')
      .switchTab()
      .getText('#msgs', function(err, text) {
        expect(text).to.contain('You have connected to the server.')
      })
      .call(done);
  });
});