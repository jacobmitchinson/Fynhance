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

  it('displays company information that gets sent', function(done){
    client
    .url('http://localhost:3001')
    .setValue('#company', 'Google')
    .click('#send')
    .getText('#msgs', function(err, text){
      expect(text).to.contain('Google')
    })
    .call(done);
  });

  xit('displays pair name', function(done) {
    client
    .url('http://localhost:3001')
    .click('#send')
    .getText('#msgs', function(err, text){
      expect(text).to.contain('Tom:')
    })
    .call(done);
  });

  xit('should tell user when it has connected', function(done) {
    client
      .url('http://localhost:3001')
      .getText('#msgs', function(err, text){
        expect(text).to.contain('You have connected to the server.')
      })
      .call(done);
  });

  xit('should let users know when a new user joins', function(done) {
    client
      .url('http://localhost:3001')
      .switchTab()
      .getText('#msgs', function(err, text) {
        expect(text).to.contain('You have connected to the server.')
      })
      .call(done);
  });

  it('')
});
