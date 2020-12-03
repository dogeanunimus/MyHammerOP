const { MessageEmbed } = require('discord.js');
const dsnipeDB = require('../../databases/models/editsnipe.js');

module.exports = {
    config: {
        nombre: "dsnipe",
        alias: ["ds", "dp"],
        categoria: "Moderación",
        descripcion: "Ver el último mensaje editado",
    },

    run: async (client, message, args) => {
        let canal = await dsnipeDB.findOne({direccion: message.channel.id}).exec();
        if (!canal) {
            return message.channel.send("¡Ningun mensaje borrado en este canal");
        } else {
        
            message.channel.send("```js\n👤 Autor del mensaje: [ "+canal.autor+" ]\n📨 Antes: [ "+canal.antes+" ]\n📩 Despues: [ "+canal.despues+" ]```");

        }
    }
}