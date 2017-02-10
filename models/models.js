const mongoose = require('mongoose');

module.exports = {
  character: mongoose.model('Character', require('./Character'))
}
