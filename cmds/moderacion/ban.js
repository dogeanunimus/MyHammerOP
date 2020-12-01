const Discord = require('discord.js');

module.exports = {
    config: {
        nombre: "ban",
        alias: ["vetar"],
        categoria: "Moderación",
        descripcion: "Banea a un miembro del servidor",
    },

    run: (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('Perdon, pero no tienes el permiso para banear personas')
          }
          
          let persona = message.mentions.members.first() || 
            message.guild.members.resolve(args[0])
          
          
          if (!persona) {
            return message.channel.send('Debe mencionar a alguien para banear')
          } else if(!persona.bannable){
            return message.channel.send('Esta persona no existe o ya esta baneada.')
          }else if (persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send('Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes banearlo')
          }
          
          if(persona.roles.cache.has('337263929380044802')) return message.channel.send("No puedo banear a este usuario ya que tiene un role de `MODERADOR.`")
          
          var razon = args.slice(1).join(' ')
          if (!razon) {
            razon = 'No hay razón especificada.'
          }
          
          //razon += `, Baneado por ${message.author.tag}`
          
          let registro = new Discord.MessageEmbed()
          .addField("`🛠️` ❯❯ Nuevo registro de moderación creado ➜ ", `\`\`\`json\n=== ¡Nuevo registro de baneo creado! ===\n• Usuario: ${persona.user.tag}\n• Moderador: ${message.author.tag}\n• Razón: ${razon} \`\`\``)
          .addField("`🛠️` ❯❯ Desbanear al usuario ➜ ", `\`\`\`json\n/unban ${persona.id}\`\`\``)
          .setFooter("Fecha del registro +", client.user.displayAvatarURL())
          .setTimestamp()
          .setColor("BLUE")
          
          message.guild.members.ban(persona, {
            reason: razon
          })
            .catch(e => message.reply('Ocurrio un **error** desconocido'))
            .then(() => {
              message.channel.send(`\`\`\`json\n¡Al usuario ${persona.user.tag} lo he banedo correctamente!\`\`\``)
              client.channels.cache.get("571930469982142474").send(registro)
            })
    }
}