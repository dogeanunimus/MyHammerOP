const {MessageEmbed} = require('discord.js');

module.exports = {
    config: {
        nombre: "ping",
        alias: ["p"],
        categoria: "Información",
        descripcion: "Comando para ver el ping de los mensajes",
    },

    run: async (client, message, args) => {
    
let pings = [
    [400, "#e61919", "<:pinned:772947382430072863> Alto"],
    [300, "#eb9534", "<:pinned:772947382430072863> Moderado"],
    [100, "#ebd849", "<:pinned:772947382430072863> Estable"],
    [0, "#ffffff", "<:pinned:772947382430072863> Bajo"]
 ]
 let ping = Math.max(Math.floor(message.client.ws.ping), 0);
 
 let ping_embed;

 for(var p of pings) {
     if(ping >= p[0]) {
        ping_embed = [p[1], p[2]]
        break
     }
 }
 
 let embed = new MessageEmbed()
 .setColor(ping_embed[0])
 .setDescription(`${ping_embed[1]} ➜ **${ping} ms**`)
 return message.channel.send(embed);
                 
    }
}