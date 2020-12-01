const Discord = require('discord.js');

module.exports = {
    config: {
        nombre: "multiban",
        alias: ["multi"],
        categoria: "Moderación",
        descripcion: "Banea multiples ID's",
    },

    run: (client, message, args) => {
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('No tengo permisos para banear personas')
          }
          
          if (!message.member.hasPermission("BAN_MEMBERS"))
                return message.channel.send(
          "No tienes el permiso `BAN_MEMBERS` para poder usar este comando."
                );
              
          let persona1 = args[0]
          if(!persona1) return message.channel.send("Ingresa las `IDs` que quieres banear.")
          let persona2 = args[1]
          let persona3 = args[2]
          let persona4 = args[3]
          let persona5 = args[4]
          let persona6 = args[5]
          let persona7 = args[6]
          let persona8 = args[7]
          let persona9 = args[8]
          let persona10 = args[9]
          let persona11 = args[10]
          let persona12 = args[11]
          let persona13 = args[12]
          let persona14 = args[13]
          let persona15 = args[14]
          let persona16 = args[15]
          let persona17 = args[16]
          let persona18 = args[17]
          let persona19 = args[18]
          let persona20 = args[19]
          
          var ids = [
          `${persona1}`,
          `${persona2}`,
          `${persona3}`,
          `${persona4}`, 
          `${persona5}`, 
          `${persona6}`, 
          `${persona7}`, 
          `${persona8}`, 
          `${persona9}`, 
          `${persona10}`, 
          `${persona11}`, 
          `${persona12}`, 
          `${persona13}`, 
          `${persona14}`, 
          `${persona15}`, 
          `${persona16}`, 
          `${persona17}`, 
          `${persona18}`, 
          `${persona19}`,
          `${persona20}` 
          ];
          
              ids.forEach(id => {
               message.guild.members.ban(id.toString()).catch(err => console.log("Se ha usado el multi-ban"));
              });
          
              const cargando = new Discord.MessageEmbed()
                .setDescription("<:correcto:755576359329464350> Baneando las `IDs` que agregaste...")
                .setColor("BLACK")
                .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                .setTimestamp()
          
              const final = new Discord.MessageEmbed()
                .setDescription("```¡Todos los usuarios fueron baneados correctamente!```")
                .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setColor("BLACK")
          
                message.channel.send(cargando).then(m => setTimeout(() => m.edit(final), 10000))
    }
}