const mongoose = require('mongoose');
const dsnipeDB = new mongoose.Schema({
    direccion: {type: String},
    usuarioAutor: {type: String},
    antes: {type: String},
    despues: {type: String},
});

module.exports = mongoose.model('dsnipeDB', dsnipeDB);