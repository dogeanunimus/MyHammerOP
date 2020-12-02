const marryDB = require('../../databases/models/marryDB.js');

module.exports = {
    config: {
        nombre: "verdb",
        alias: ["si"]
    },

    run: async (client, message, args) => {
let ver = await marryDB.find()
console.log(ver);
    }
}