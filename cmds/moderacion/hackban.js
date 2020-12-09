const { MessageEmbed, GuildMember } = require('discord.js');

module.exports = {
    config: {
        nombre: "hackban",
        alias: ["hack", "hban", "banid"],
        categoria: "Moderación",
        descripcion: "Banea a un usuario por ID sin que esté en el servidor",
    },

    run: async (client, message, args) => {
        try {

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> No tienes el permiso `BAN_MEMBERS` para poder ejecutar este comando")
            .setColor("RED")
            return message.channel.send(embed).then(m => {
                m.delete({timeout: 10000});
            
            });
        }
        
        let mid = args.join(" ");
        if (!mid) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> Agrega una ID")
            .setColor("RED")
            return message.channel.send(embed).then(m => {
                 m.delete({timeout: 10000})
            });

        } else if (isNaN(mid)) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> ¡Eso no es una ID!")
            .setColor("RED")
            return message.channel.send(embed).then(m => {
                m.delete({timeout: 10000})
            });
        }

        const baneo = await client.users.fetch(mid);
        message.guild.members.ban(baneo.id)
        

        const embed = new MessageEmbed()
        .setDescription("<:correcto:755576359329464350> ¡He baneado correctamente la ID => `"+mid+"`!")
        .setColor("GREEN")
        message.channel.send(embed);

} catch (error) {
    const embed = new MessageEmbed()
    .setDescription("<:error:755652678285131848> ¡La ID que agregaste no existe!")
    .setColor("RED")
    message.channel.send(embed);

        }
    }
}