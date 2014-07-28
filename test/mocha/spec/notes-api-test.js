var app = require('../../../server.js'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect;

chai.use(chaiHttp);

describe('the notes api', function() {
  var base = 'http://localhost:3000/api/v1';
  var id;
  it('should be able to create a note', function(done) {
    chai.request(base)
      .post('/notes')
      .req(function(req) {
        req.send({'noteBody': 'hello world'});
      })
      .res(function(res) {
        expect(res.body).to.have.property('noteBody');
        expect(res.body).to.have.property('_id');
        expect(res.body.noteBody).to.eql('hello world');
        id = res.body._id
        done();
      });
  });

  it('should not create a new blank note', function(done) {
    chai.request(base)
      .post('/notes')
      .res(function(res) {
        expect(res.body.msg).to.eql('cannot create an empty note');
        done();
      });
  });

  it('should be able to get that note', function(done) {
    chai.request(base)
      .get('/notes/' + id)
      .res(function(res) {
        expect(res.body).to.have.property('noteBody');
        expect(res.body.noteBody).to.eql('hello world');
        done();
      });
  });

  it('should be able to get all notes', function(done) {
    chai.request(base)
      .get('/notes')
      .res(function(res) {
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to update a note', function(done) {
    chai.request(base)
      .put('/notes/' + id)
      .req(function(req) {
        req.send({'noteBody': 'new note body'});
      })
      .res(function(res) {
        expect(res.body).to.have.property('noteBody');
        expect(res.body.noteBody).to.eql('new note body')
        done();
      });
  });

  it('should be able to delete a note', function(done) {
    chai.request(base)
      .del('/notes/' + id)
      .res(function(res) {
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.eql('note has been deleted');
        done();
      });
  });
});
