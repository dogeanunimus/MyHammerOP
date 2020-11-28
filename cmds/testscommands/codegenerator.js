const codeVerificationRB = require('../../util/codigos.js');

module.exports = {
    config: {
        nombre: "codegenerator",
        alias: ["code"],
        categoria: "testcommands",
        descripcion: "Comando para generar codigo",
    },

    run: (client, message, args) => {
        if(args.join(" ") == codeVerificationRB.codigo.find(x => x == args.join(" "))) {
            message.channel.send("Es igual perro.");
        } else {
            message.channel.send("No es igual perro.");
        }
    }
}