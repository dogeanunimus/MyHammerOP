module.exports = {
    config: {
        nombre: "unban",
        alias: ["desbanear"],
        categoria: "Moderación",
        descripcion: "Desbanear a un usuario del servidor",
    },

    run: async (client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) { 
            return message.channel.send(`**${message.author.username}** No dispones de permisos para banear gente.`)
          }
          
          if(!message.guild.me.hasPermission("BAN_MEMBERS")) { 
            return message.channel.send(`**${message.author.username}** No tengo permisos`) 
          }
          
          let userID = args[0] 
            message.guild.fetchBans().then(bans=> { 
            if(bans.size == 0) return message.channel.send("No hay baneos") 
            let bUser = bans.find(b => b.user.id == userID)
            if(!bUser) return message.channel.send('La ID que proporcionaste '+userID+' no existe o no está baneado en el servidor.') 
            message.guild.members.unban(bUser.user) 
      });
      
          message.channel.send('El usuario `'+userID+'` fue desbaneado correctamente.');
          
    }
}