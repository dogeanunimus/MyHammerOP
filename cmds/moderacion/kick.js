const Discord = require('discord.js');

module.exports = {
    config: {
        nombre: "kick",
        alias: ["patear"],
        categoria: "Moderación",
        descripcion: "Patea a un miembro del servidor",
    },

    run: (client, message, args) => {
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('No tengo permisos para kickear personas')
          }
          
          if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('Perdon, pero no tienes el permiso para kickear personas')
          }
          
          let persona = message.mentions.members.first() || 
            message.guild.members.resolve(args[0])
          
          if (!persona) {
            return message.channel.send('Debe mencionar a alguien para kickear')
          } else if(!persona.kickable){
            return message.channel.send('No puedo kickear a esta persona')
          }else if (persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send('Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes kickearlo')
          }
          
          if(persona.roles.cache.has('414921592926109697')) return message.channel.send("No puedo expulsar a este usuario ya que tiene un role de `MODERADOR.`")
          
          
          var razon = args.slice(1).join(' ')
          if (!razon) {
            razon = 'No hay razón especificada.'
          }
          
          //razon += `, Kickeado por ${message.author.tag}`
          
          let registro = new Discord.MessageEmbed()
          .addField("`🛠️` ❯❯ Nuevo registro de moderación creado ➜ ", `\`\`\`json\n=== ¡Nuevo registro de kick creado! ===\n• Usuario: ${persona.user.tag}\n• Moderador: ${message.author.tag}\n• Razón: ${razon} \`\`\``)
          .setFooter("Fecha del registro +", client.user.displayAvatarURL())
          .setTimestamp()
          .setColor("RED")
          
          
          message.guild.member(persona).kick(razon);
          
              message.channel.send(`\`\`\`json\n¡Al usuario ${persona.user.tag} lo he pateado correctamente!\`\`\``)
              client.channels.cache.get("571930469982142474").send(registro)
    }
}