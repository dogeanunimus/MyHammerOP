const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format");

module.exports = {
    config: {
        nombre: "remove-personalizado",
        alias: ["rp"],
        categoria: "Lootboxes",
        descripcion: "Remueve el role personalizado de un usuario",
    },

    run: async (client, message, args) => {
        if(!message.member.roles.cache.has("765376758337765386")) {
            return message.channel.send("¡Hey! No puedes usar este comando.")
          }
          
          const fecha = moment(new Date()).format("DD/MM/YYYY"); 
          let persona = message.mentions.members.first() || 
          message.guild.members.resolve(args[0]) 
            if (!persona) return message.channel.send(new Discord.MessageEmbed()
            .setDescription("<:esperando:755652706873507860> Menciona o agrega la ID del usuario a remover el role. Modo de uso: `/remove-personalizado <mencion/id> <nombre/idRole>`")
            .setColor("BLUE")
            )
            if(!args[1]){
              return message.channel.send()
            }
          
          let rol = message.mentions.roles.first() ||
          message.guild.roles.resolve(args[1]) || 
          message.guild.roles.cache.find(r => r.name == args.slice(1).join(' ')) 
          
          if (!rol) {
          return message.channel.send(new Discord.MessageEmbed()
          .setDescription("<:error:755652678285131848> ¡Ese role no existe en el servidor! Verifica que estas agregando correctamente el nombre o la ID del role")
          .setColor("RED")
                )
          }
          
           if(rol == '414921592926109697') {
                return message.channel.send(new Discord.MessageEmbed()
                .setDescription("<:error:755652678285131848> ¡Alto! No puedes remover un role que no es personalizado")
                .setColor("RED")
                )
           }
          
          
          persona.roles.remove(rol)
          
          message.channel.send(new Discord.MessageEmbed()
          .setDescription(`<:correcto:755576359329464350> ¡Role ${rol} removido correctamente al usuario ${persona}`)
          .setColor("GREEN")
          )
          
          let registro = new Discord.MessageEmbed()
          .setThumbnail(persona.user.displayAvatarURL({dynamic: true}))
          .setDescription(`<:correcto:755576359329464350> Role personalizado removido al usuario ${persona}`)
          .addField("`👮` Moderador:", `\`\`\`md\n# ${message.author.tag}\`\`\``, true)
          .addField("`📅` Fecha:", `\`\`\`md\n* ${fecha}\`\`\``, true)
          .addField("`🧶` Nombre del role:", `\`\`\`md\n# ${rol.name}\`\`\``, true)
          .setTimestamp()
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setColor('PURPLE')
          
          client.channels.cache.get("765333029559730206").send(registro);
    }
}