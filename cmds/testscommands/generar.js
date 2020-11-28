const codeVerificationRB = require('../../util/codigos.js');

module.exports = {
    config: {
        nombre: "generar",
        alias: ["g"],
        descripcion: "Genera codigo de verifación.",
        categoria: "Testcommands",
    },

    run: (client, message, args) => {

    let random = codeVerificationRB.codigo[Math.floor(Math.random() * codeVerificationRB.codigo.length)];
    
        message.channel.send(random);
    }
}