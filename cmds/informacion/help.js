module.exports = {
    config: {
        nombre: "help",
        alias: ["h"],
        descripcion: "Este comando sirve para ver la informacion y modo de uso de otros comandos.",
        categoria: "informacion"
    },

    run: async (client, message, args) => {
   const Discord = require('discord.js')
   
    if(!args) return message.channel.send("Y los exports")
    
    
    let commandfile = client.commands.get(args[0]) || client.commands.get(client.alias.get(args[0]))
    if(!commandfile) {
        return;
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**Nombre del comando:** ${commandfile.config.nombre}\n**Descripción del comando:** ${commandfile.config.descripcion}\n**Categoria del comando:** ${commandfile.config.categoria}`)
    message.channel.send(embed)

    }
}