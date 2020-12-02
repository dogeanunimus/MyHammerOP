const mongoose = require('mongoose');
const snipeDB = new mongoose.Schema({
    canal: {type: Number},
    mensaje: {type: String},
    autor: {type: String}
});

module.exports = mongoose.model('snipeDB', snipeDB);