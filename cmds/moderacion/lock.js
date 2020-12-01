const Discord = require('discord.js');

module.exports = {
    config: {
        nombre: "lock",
        alias: ["cerrar"],
        categoria: "Moderacion",
        descripcion: "Cierra un canal",
    },

    run: (client, message, args) => {
        var permisos = message.member.hasPermission("KICK_MEMBERS") 
    if(!permisos) return message.channel.send("<:error:755652678285131848> ¡Alto! Tu no eres staff.")  
    
    if (!args.length) {
		return message.channel.send('<:error:755652678285131848> ¡Hey! <@'+message.author+'> necesitas agregar un parametro `on` si quieres cerrar el canal o un parametro `off` para abrir el canal.');

	}

	else if (args[0] === 'on') {

 let alluser = message.guild.roles.cache.find(aus => aus.name === '👁️‍🗨️ ⊰「Verificado」')
            message.channel.updateOverwrite(alluser, { SEND_MESSAGES: false });
            const canalblock = new Discord.MessageEmbed() 
                .setDescription("`🔐` • Chat bloqueado.") 
                .setColor('RED')
                .setTimestamp() 
                .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(canalblock).then(m => {
   m.react('🔐')
            })
    }
           
    else if (args[0] === 'off') {
    
 let alluser = message.guild.roles.cache.find(aus => aus.name === '👁️‍🗨️ ⊰「Verificado」')
            message.channel.updateOverwrite(alluser, { SEND_MESSAGES: true });
            const canalblock = new Discord.MessageEmbed() 
                .setDescription("`🔐` • Chat desbloqueado.") 
                .setColor('GREEN') 
                .setTimestamp()
                .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))

            message.channel.send(canalblock).then(m => {
              m.react('🔑')
            })
    
        }
    }
}