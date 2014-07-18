var app = require('../../../server.js'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect;

chai.use(chaiHttp);

describe('the root route', function() {
  it('should get 200-ok from the root route', function(done) {
    chai.request('http://localhost:3000')
      .get('/')
      .res(function(res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
