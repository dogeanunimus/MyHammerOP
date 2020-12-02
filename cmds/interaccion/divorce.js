const { MessageEmbed } = require('discord.js');
const marryDB = require('../../databases/models/marryDB.js');
const marry = require('./marry.js');

module.exports = {
    config: {
        nombre: "divorce",
        alias: ["divorciar", "div"],
        categoria: "Interacción",
        descripcion: "Divorciate de tu pareja actual",
    },

    run: async (client, message, args) => {
        let AutorComprobar = await marryDB.findOne({pareja: message.author.id}).exec();
        if (!AutorComprobar) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> ¿De quién te vas a divorciar si no tienes a nadie? ¿De soledad?")
            .setColor("RED")
            return message.channel.send(embed);
        }

        let usuario = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!usuario) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> ¡Menciona o agrega la ID de la persona con la que tienes matrimonio, para poder divociarte.")
            .setColor("RED")    
            return message.channel.send(embed);
        }

        if (usuario == message.author.id) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> ¡No te puedes divociar divorciar de ti mismo!")
            .setColor("RED")
            return message.channel.send(embed);

        }

        if (usuario.bot) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> ¡No te puedes divorciar de un bot!")
            .setColor("RED")
            return message.channel.send(embed);
        }

        let pareja = await marryDB.findOne({pareja: message.author.id}).exec();
        if (usuario != pareja.parejaUsuario) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> ¡Este usuario no es tu pareja! Divorciate de quien si lo es.")
            .setColor("RED")
            return message.channel.send(embed);

        }

        let correcto = new MessageEmbed()
        .setDescription(`💔 ¡Ouch! Parece que un "felices por siempre" no fue como lo esperaban... Te divorciaste correctamente de ${usuario}.`)
        .setColor("GREEN")
        message.channel.send(correcto);

        await marryDB.findOneAndDelete({pareja: message.author.id}, {parejaUsuario: usuario.id}).exec();
        await marryDB.findOneAndDelete({pareja: usuario.id}, {parejaUsuario: message.author.id}).exec();
    }
}