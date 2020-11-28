const conteo = require('../../databases/models/contador.js');

module.exports = {
    config: {
        nombre: "agregar",
        alias: ["add"],
        categoria: "testcommands",
        descripcion: "comprobar si",
    },
    
    run: async (client, message, args) => {
        let Uso = new conteo({usuario: message.author.id});
        await Uso.save()
        message.channel.send("Se agrego el usuario a la database.")
       
    }
}