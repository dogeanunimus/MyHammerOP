const Discord = require('discord.js')


module.exports = {
    config: {
        nombre: "charla",
        alias: ["clock"],
        categoria: "Moderación",
        descripcion: "Cierra el canal de turno charla",
    },

    run: async (client, message, args) => {
    var permisos = message.member.hasPermission("KICK_MEMBERS") 
    if(!permisos) return message.channel.send("<:error:755652678285131848> ¡Alto! Tu no eres staff.")  
    
    if (!args.length) {
		return message.channel.send('<:error:755652678285131848> ¡Hey! <@'+message.author+'> necesitas agregar un parametro `on` si quieres cerrar el canal o un parametro `off` para abrir el canal.');

	}

	else if (args[0] === 'on') {

        let titan = message.guild.roles.cache.find(x => x.name === 'Titán Supremo ⚒💎👑');
        let maestro = message.guild.roles.cache.find(y => y.name === 'Titán Maestro ⚒💎');
        let supremo = message.guild.roles.cache.find(z => z.name === 'Titán ⚒');
        let tier1 = message.guild.roles.cache.find(a => a.name === 'Twitch Sub Tier 1');
        let tier2 = message.guild.roles.cache.find(b => b.name === 'Twitch Sub Tier 2');
        let tier3 = message.guild.roles.cache.find(c => c.name === 'Twitch Sub Tier 3');


message.channel.updateOverwrite(titan, { SEND_MESSAGES: false });
message.channel.updateOverwrite(maestro, {SEND_MESSAGES: false});
message.channel.updateOverwrite(supremo, { SEND_MESSAGES: false});
message.channel.updateOverwrite(tier1, {SEND_MESSAGES: false});
message.channel.updateOverwrite(tier2, {SEND_MESSAGES: false});
message.channel.updateOverwrite(tier3, {SEND_MESSAGES: false});


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

let titan = message.guild.roles.cache.find(x => x.name === 'Titán Supremo ⚒💎👑');
let maestro = message.guild.roles.cache.find(y => y.name === 'Titán Maestro ⚒💎');
let supremo = message.guild.roles.cache.find(z => z.name === 'Titán ⚒');
let tier1 = message.guild.roles.cache.find(a => a.name === 'Twitch Sub Tier 1');
let tier2 = message.guild.roles.cache.find(b => b.name === 'Twitch Sub Tier 2');
let tier3 = message.guild.roles.cache.find(c => c.name === 'Twitch Sub Tier 3');

message.channel.updateOverwrite(titan, {SEND_MESSAGES: true});
message.channel.updateOverwrite(maestro, {SEND_MESSAGES: true});
message.channel.updateOverwrite(supremo, {SEND_MESSAGES: true });
message.channel.updateOverwrite(tier1, {SEND_MESSAGES: true});
message.channel.updateOverwrite(tier2, {SEND_MESSAGES: true});
message.channel.updateOverwrite(tier3, {SEND_MESSAGES: true});


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