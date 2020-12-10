const moment = require("moment")
require("moment-duration-format");

const fecha = moment(new Date()).format("DD/MM/YYYY"); 
const Discord = require('discord.js')

module.exports = {
    config: {
        nombre: "warn",
        alias: ["advertencia", "w"],
        categoria: "Moderación",
        descripcion: "Dale una advertencia a los usuarios que no respeten las reglas del servidor",
    },

    run: (client, message, args) => {
        if(!message.member.roles.cache.has("414921592926109697")) {
            return message.channel.send("¡Hey! No puedes usar este comando.")
          }
          
            var usuario = message.mentions.members.first() || message.guild.members.resolve(args[0])
          
            if(!usuario) {
              return message.channel.send("¡Hey! Agrega la ID o menciona a un usuario para poder advertirlo.")
            }
          
          if(usuario.roles.cache.has('414921592926109697')) return message.channel.send("No puedes usar esto con un miembro del staff.")
          
          var razon = args.slice(1).join(' ')
          if (!razon) {
          return message.channel.send("<:esperando:755652706873507860> `|` ¡Hey! Agrega una razón.")
          }
          
          const dm = new Discord.MessageEmbed()
          .setThumbnail(usuario.user.displayAvatarURL({dynamic: true}))
          .setAuthor("¡Nueva advertencia!", client.user.displayAvatarURL())
          .addField("`⚒️` ❯❯ Datos sobre la advertencia ➜", '`👮` • **Moderador:** '+message.author.tag+'\n`✏️` • **Razón:** '+razon+'')
          .setFooter(client.user.tag, client.user.displayAvatarURL())
          .setTimestamp()
          .setColor("RANDOM")
          
          let registro = new Discord.MessageEmbed()
          .setDescription(`\`\`\`md\n# Tipo de caso: WARN\n* Infractor:\n> ${usuario.user.tag} | ${usuario.id}\n* Moderador:\n> ${message.author.tag}\n* Razón:\n> ${razon}\n* Fecha:\n> ${fecha}\`\`\``)
          .setColor("RANDOM")
          
          
          client.channels.cache.get("571930469982142474").send(registro);
          message.channel.send(`\`\`\`json\n¡Usuario ${usuario.user.tag} fue advertido correctamente!\`\`\``)
          
          
          client.users.cache.get(usuario.id).send(dm).catch(err => message.channel.send(dm))
    }
}