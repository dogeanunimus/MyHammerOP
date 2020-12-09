const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        nombre: "avatar",
        alias: ["av"],
        categoria: "Información",
        descripcion: "Ver tu foto de perfil o de otro usuario del servidor",
    },
    run: async (client, message, args) => {

        
            let usuario = member = message.mentions.members.first() 
            || message.guild.members.cache.get(args[0]) 
            || message.guild.members.cache.find(m => m.user.tag.toLowerCase() === args.join(" ").toLowerCase()) 
            || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args.join(" ").toLowerCase()) 
            || message.guild.members.cache.find(m => m.user.tag.toLowerCase().includes(args.join(" ").toLowerCase())) 
            || message.guild.members.cache.find(m => m.displayName.toLowerCase().includes(args.join(" ").toLowerCase()))
            || message.member;            
              

    /*const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.find((m) => m.displayName.toLowerCase() === args.join("").toLowerCase()) || message.member;
        /*

let usuario = message.mentions.users.first() ||
            client.users.resolve(args[0]) ||
            client.users.cache.find(x => (args) ? (args.join(" ") == x.tag) : undefined) ||
            message.author; 
            */

           const embed = new MessageEmbed()
           .setImage(usuario.user.displayAvatarURL({dynamic: true, size: 1024}))
           .setColor(usuario.displayHexColor)
           
           
         message.channel.send({embed: embed});
    }
}