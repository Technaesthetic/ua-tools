const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./models/models')

mongoose.connect('mongodb://localhost/uatools');

var Character = models['character'];

router.post('/get/:type', function response(req, res) {
  const type = req.params.type
  console.log(req.body);
  const list = models[type].find({}, function (err, list) {
    res.send(list);
  });
});

router.post('/add/:type', function response(req, res) {
  const type = req.params.type
  const note = new models[type](req.body);
  note.save(function(err){
    if (err) {
      console.log(err);
      res.send({status: 'error', err})
    } else {
      res.send({status: 'success'});
    }
  });
});

router.post('/del/:type', function response(req, res) {
  const type = req.params.type
  models[type].findByIdAndRemove(req.body._id, function(err) {
    if (err) {
      console.log(err);
      res.send({status: 'error', err});
    } else {
      res.send({status: 'success'});
    }
  });
});

router.post('/upd/:type', function response(req, res) {
  const type = req.params.type
  const update = req.body.fields;
  console.log('REQUEST BODY')
  console.log(req.body);
  models[type].findByIdAndUpdate(req.body._id, update, {}, function(err) {
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
