const { MessageEmbed } = require('discord.js');
const codeVerificationRB = require('../../util/codigos.js');
const conteo = require('../../databases/models/contador.js');

let cooldown= new Set();

module.exports = {
    config: {
        nombre: "key",
        alias: ["k"],
        descripcion: "Comando para poder generar un código y poder verificarte.",
        categoria: "Verificación."
    },

    run: async (client, message) => {
        if(cooldown.has(message.author.id)){
            return;
         }
         cooldown.add(message.author.id);
         setTimeout(() => {
           cooldown.delete(message.author.id);
         }, 500000);
        
         let Uso = new conteo({usuario: message.author.id});
        await Uso.save()

    let random = codeVerificationRB.codigo[Math.floor(Math.random() * codeVerificationRB.codigo.length)];
        
        const embed = new MessageEmbed()
        .setDescription("<:correcto:755576359329464350> **¡Generaste un código!** Ahora, copia y pegalo en el estado de tu perfil en **ROBLOX** como se muestra en la imagen.")
        .addField("`🔐` ❯❯ Código:", "```\n"+random+"```")
        .setImage("https://media.discordapp.net/attachments/646072711797538818/781658543609741352/unknown.png")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor("BLUE")

        message.author.send(embed)
    }
}