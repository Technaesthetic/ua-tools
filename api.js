const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Note = mongoose.model('Note', {
  _id: String,
  text: String,
  done: Boolean
});

router.get('/get', function response(req, res) {
  const list = Note.find({}, function (err, list) {
    res.send(list);
  });
});

router.post('/add', function response(req, res) {
  const note = new Note(req.body);
  note.save(function(err){
    if (err) {
      console.log(err);
      res.send({status: 'error', err})
    } else {
      res.send({status: 'success'});
    }
  });
});

router.post('/del', function response(req, res) {
  Note.findByIdAndRemove(req.body._id, function(err) {
    if (err) {
      console.log(err);
      res.send({status: 'error', err});
    } else {
      res.send({status: 'success'});
    }
  });
});

router.post('/upd', function response(req, res) {
  const update = {$set: req.body.fields};
  console.log(req.body);
  Note.findByIdAndUpdate(req.body._id, update, {}, function(err) {
    if (err) {
      console.log(err);
      res.send({status: 'error', err});
    } else {
      res.send({status: 'success'});
    }
  });
});

router.get('/*', function response(req, res) {
  res.send('Not a valid api route!');
});

module.exports = router;
