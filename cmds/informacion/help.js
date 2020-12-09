const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        nombre: "help",
        alias: ["h"],
        descripcion: "Este comando sirve para ver la informacion y modo de uso de otros comandos.",
        categoria: "Información"
    },

    run: async (client, message, args) => {
    const falta = new MessageEmbed()
    .setDescription("<:error:755652678285131848> ¡Agrega el nombre de un comando!")
    .setColor("RED")
    if(!args[0]) return message.channel.send(falta).then(m => {
        m.delete({timeout: 10000});
    });

    let commandfile = client.commands.get(args[0]) || client.commands.get(client.alias.get(args[0]))
    if(!commandfile) {
        let noExiste = new MessageEmbed()
        .setDescription(`<:error:755652678285131848> No encontré un comando llamado "${args[0]}"`)
        .setColor("RED")
        return message.channel.send(noExiste).then(m => {
            m.delete({timeout: 7000});
        });
    };

    const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .addField("<:discord:772940016267034654> • Nombre del comando:", `**ᘛ ┆** ${commandfile.config.nombre}`, true)
    .addField("<:pinned:772947382430072863> • Categoría:", `**ᘛ ┆** ${commandfile.config.categoria}`, true)
    .addField(">>> <:rich:772945192356413440> • Descripción:", `**ᘛ ┆** ${commandfile.config.descripcion}`)
    .addField("<:join_arrow:772950616867209237> • Aliases:", `**ᘛ ┆** ${commandfile.config.alias.join(" • ")} **┆**`)
    .addField(">>> <:onlains:772942790187024434> • Estado del comando:", "**ᘛ┆** [▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ 100%](https://discord.com/channels/337261425082761238/337267617264041994/692954281690529803)")
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setColor("BLUE")
    .setTimestamp()
    
    message.channel.send(embed)
    }
}