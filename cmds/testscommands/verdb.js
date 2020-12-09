const eddsnipeDB = require('../../databases/models/editsnipe.js')
const snipeDB = require('../../databases/models/snipemessages.js');

module.exports = {
    config: {
        nombre: "verdb",
        alias: ["verbase"]
    },

    run: async (client, message, args) => {
let ver = await eddsnipeDB.deleteMany()
console.log(ver);
let verr = await snipeDB.deleteMany()

    }
}