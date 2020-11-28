const mongoose = require('mongoose');
const RobloxUser = new mongoose.Schema({
    dueño: { type: Number },
    nombreCuenta: { type: String },
});

module.exports = mongoose.model('RobloxUser', RobloxUser);

