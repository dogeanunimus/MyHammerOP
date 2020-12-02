const snipeDB = require('../../databases/models/snipemessages.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        nombre: "snipe",
        alias: ["sn"],
        categoria: "Moderación",
        descripcion: "Ver el último mensaje borrado en un canal",
    },

    run: async (client, message, args) => {
      let snipe = await snipeDB.findOne({canal: message.channel.id}).exec()
      if (!snipe) {
          return message.channel.send("¡No hay un mensaje recientemente borrado en este canal!")
      }


      const embed = new MessageEmbed()
      .setAuthor(`Autor: ${snipe.autor}`, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(snipe.mensaje)
      .setColor("BLUE")
      .setFooter(client.user.tag, client.user.displayAvatarURL())

      message.channel.send(embed);
    }
}