const mongoose = require('mongoose'),
      config = require('config');

mongoose.connect(config.uris, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;