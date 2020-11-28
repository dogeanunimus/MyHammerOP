const mongoose = require('mongoose');
const PrefixDB = new mongoose.Schema({
  guild: { type: String },
  prefix: { type: String },
});

module.exports = mongoose.model('PrefixDB', PrefixDB);