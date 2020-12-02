const mongoose = require('mongoose');

const marryDB = new mongoose.Schema({
    servidor: { type: String  },
    pareja: { type: String },
    parejaUsuario: { type: String },
});

module.exports = mongoose.model('marryDB', marryDB);
