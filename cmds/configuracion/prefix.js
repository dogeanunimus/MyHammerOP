const Discord = require('discord.js');
const mongoose = require('mongoose');
const PrefixDB = require('../../databases/models/prefixes.js');

module.exports = {
    config: {
        nombre: "prefix",
        alias: ["set"],
        categoria: "configuracion",
        descripcion: "Este comando sirve para modificar el prefix del bot"
    },

    run: async (client, message, args) => {

if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
      .setDescription("<:error:755652678285131848> ¡Agrega un prefijo para poder establecerlo!")
      .setColor("RED")
); 

if (args[0].length > 3) return message.channel.send(new Discord.MessageEmbed()
      .setDescription("<:error:755652678285131848> ¡El nuevo prefijo no puede tener mas de 3 caracteres!")
      .setColor("RED")
); 

let res = await PrefixDB.findOne({guild: message.guild.id}).exec()
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`<:correcto:755576359329464350> ¡Se ha establecido correctamente el nuevo prefijo! **${args[0]}**`)
        .setColor("GREEN")
        );

if (res) {

  await PrefixDB.updateOne({ guild: message.guild.id }, { prefix: args[0] }) 

} else {

let nuevo = new PrefixDB({guild: message.guild.id, prefix: args[0]});

await nuevo.save() 

        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`<:correcto:755576359329464350> ¡Se ha establecido correctamente el nuevo prefijo! **${args[0]}**`)
        .setColor("GREEN")
        );

      }
    } 
}