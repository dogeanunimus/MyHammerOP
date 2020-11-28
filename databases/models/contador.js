const mongoose = require('mongoose');
const conteo = new mongoose.Schema({
    usuario: { type: Number }
});

module.exports = mongoose.model('conteo', conteo);
