const conteo = require('../../databases/models/contador.js');

module.exports = {
    config: {
        nombre: "comprobar",
        alias: ["c"],
        categoria: "testcommands",
        descripcion: "comprobar si",
    },
    
    run: async (client, message, args) => {

        let usuarioUso = await conteo.findOne({usuario: message.author.id}).exec()
        if (!usuarioUso) {
            message.channel.send("NO EXISTE!");
        } else {
            message.channel.send("SI EXISTE!");
        }
    }

}