const moment = require("moment")
require("moment-duration-format");

const fecha = moment(new Date()).format("DD/MM/YYYY"); 
const Discord = require('discord.js');

module.exports = {
    config: {
        nombre: "quitar-pase",
        alias: ["qp"],
        categoria: "Lootboxes",
        descripcion: "Remueve el pase de imágenes de un usuario",
    },

    run: async (client, message, args) => {
        if(!message.member.roles.cache.has("765376758337765386")) {
            return message.channel.send("<:error:755652678285131848> ¡Hey! No puedes usar este comando.")
          }
          
          let usuario = message.mentions.members.first() || message.guild.members.resolve(args[0])
          if(!usuario) return message.channel.send(
              new Discord.MessageEmbed()
              .setDescription("<:error:755652678285131848> Menciona o agrega la ID del usuario que le quieras quitar el role <@&598295827345047565>")
              .setColor("RED")
          )
          
          usuario.roles.remove("598295827345047565")
          if(!usuario.roles.cache.has("598295827345047565")) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription("<:error:755652678285131848> Este usuario no tiene pase de imágenes.")
            .setColor("RED")
            )
          }
          
          message.channel.send(new Discord.MessageEmbed()
          .setDescription(`<:correcto:755576359329464350> ¡Role removido correctamente al usuario ${usuario}`)
          .setColor("GREEN")
          )
          
          let registro = new Discord.MessageEmbed()
          .setThumbnail(usuario.user.displayAvatarURL({dynamic: true}))
          .setDescription(`<:correcto:755576359329464350> Pase de imágenes removido al usuario ${usuario}`)
          .addField("`👮` Moderador:", `\`\`\`md\n# ${message.author.tag}\`\`\``, true)
          .addField("`📅` Fecha:", `\`\`\`md\n* ${fecha}\`\`\``, true)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setColor('GREEN')
          
          client.channels.cache.get("765333029559730206").send(registro);
          
    }
}