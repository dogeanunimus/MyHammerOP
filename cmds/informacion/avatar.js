const { MessageAttachment } = require('discord.js');
module.exports = {
    config: {
        nombre: "avatar",
        alias: ["av"],
        categoria: "Información",
        descripcion: "Ver tu foto de perfil o de otro usuario del servidor",
    },
    run: (client, message, args) => {

        let usuario = message.mentions.members.first() || 
    message.guild.members.resolve(args[0]) || 
    message.guild.members.cache.find(u => u.user.username.includes(args[0])) ||
    message.guild.members.cache.find(u => u.user.tag.includes(args[0])) ||
    message.member;

/*
let usuario = message.mentions.users.first() ||
            client.users.resolve(args[0]) ||
            client.users.cache.find(x => (args) ? (args.join(" ") == x.tag) : undefined) ||
            message.author; 
            */

            const attachment = new MessageAttachment(usuario.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"}))

message.channel.send(attachment).catch(e => message.channel.send("¡Oops! Parece que ocurrió algo inesperado."))
    }
}