'use strict';

var Note = require('../models/note');

module.exports = function(app) {
  app.post('/api/v1/notes', function(req, res) {
    var note = new Note(req.body);
    if (!note.noteBody) return res.send(500, {'msg': 'cannot create an empty note'});
    note.save(function(err, newNote) {
      if (err) return res.send(500, err);
      return res.send(newNote);
    });
  });

  app.get('/api/v1/notes', function(req, res) {
    Note.find({}, function(err, notes) {
      if (err) return res.send(500, err);
      return res.send(notes);
    });
  });

  app.get('/api/v1/notes/:id', function(req, res) {
    var id = req.params.id;
    Note.findOne({'_id': id}, function(err, note) {
      if (err) return res.send(500, err);
      return res.send(note);
    });
  });

  app.put('/api/v1/notes/:id', function(req, res) {
    var id = req.params.id;
    var body = req.body;
    delete body._id;
    Note.findOneAndUpdate({'_id' : id}, body, function(err, note) {
      if (err) return res.send(500, err);
      return res.send(note);
    });
  });

  app.delete('/api/v1/notes/:id', function(req, res) {
    var id = req.params.id;
    Note.remove({'_id': id}, function(err) {
      if (err) return res.send(500, err);
      return res.send({'msg': 'note has been deleted'});
    });
  });
}
