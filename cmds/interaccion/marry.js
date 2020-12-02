const { MessageEmbed } = require('discord.js');
const marryDB = require('../../databases/models/marryDB.js');

module.exports = {
    config: {
        nombre: "marry",
        alias:["casar"],
        categoria: "Interacción",
        descripcion: "Este comando sirve para casarte con un usuario",
    },

    run: async (client, message, args) => {

        let autorPareja = await marryDB.findOne({pareja: message.author.id}).exec()
        if (autorPareja) {
            const embed = new MessageEmbed()
            .setDescription(`<:error:755652678285131848> **¡Hey para!** Tu ya tienes una pareja y se llama <@${autorPareja.parejaUsuario}>. No me seas infiel...`)
            .setColor("RED")
            return message.channel.send(embed);
        }

        let usuario = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (!usuario) {
            const embed = new MessageEmbed()
            .setDescription("<:esperando:755652706873507860> ¡Menciona o agrega la ID del usuario con el que quieras contraer matrimonio.")
            .setColor("RED")
            return message.channel.send(embed);
        }

        if (usuario == message.author) {            
            const embed = new MessageEmbed()
            .setDescription("<:esperando:755652706873507860> ¿Hola? La soledad te esta matando. No te puedes casar contigo mismo.")
            .setColor("RED")
            return message.channel.send(embed);
        }

        if (usuario.bot) {
            const embed = new MessageEmbed()
            .setDescription("<:esperando:755652706873507860> ¿Hasta qué punto piensas llegar? No te puedes casar con un bot.")
            .setColor("RED")
            return message.channel.send(embed);
        }

        let mencionadoPareja = await marryDB.findOne({pareja: usuario.id}).exec()   
        if (mencionadoPareja) {
            const embed = new MessageEmbed()
            .setDescription(`<:error:755652678285131848> ¡Te quieres casar con alguien que ya tiene un matrimonio! El nombre de la pareja de este usuario es <@${mencionadoPareja.parejaUsuario}>.`)
            .setColor("RED")
            return message.channel.send(embed);
        }

        let proceso = new MessageEmbed()
        .setDescription(`💍 Qué tenemos aquí... Parece que nuestro buen amig@ <@${message.author.id}> quiere tener algo con <@${usuario.id}> ❤️. <@${usuario.id}> ¿Quieres contraer matrimonio? Usa **(acepto/rechazo)** para tomar la decisión.`)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter("Tiempo límite para aceptar = 60 segundos.", message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(proceso);

        const collector = message.channel.createMessageCollector(m => m.author.id === usuario.id && m.channel.id === message.channel.id, {time : 60000}); 

        collector.on("collect", async collected => { 

    if (collected.content.toLowerCase() === "acepto") {
        const embed = new MessageEmbed()
        .setDescription(`🎉 ¡Oooooooooooooooooh! Felicidades a la nueva pareja. Duren y sean felices por siempre 💍 ${message.author} y ${usuario} ❣️`)    
        .setColor("GREEN")
        .setFooter(client.user.tag, client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed); 

        let servidor = await marryDB.findOne({servidor: message.guild.id}).exec()
        if (servidor) {
            await marryDB.updateOne({servidor: message.guild.id})

        } else {
            const servidorSave = new marryDB({servidor: message.guild.id})
            await servidorSave.save()
        }

        let buscar = await marryDB.findOne({pareja: message.author.id}).exec()

        if (!buscar) {
         
            const nuevo = new marryDB({pareja: message.author.id, parejaUsuario: usuario.id})
            await nuevo.save()
        } 

        let buscarU = await marryDB.findOne({pareja: usuario.id}).exec()
        if (!buscarU) {
       
            const nuevoDos = new marryDB({pareja: usuario.id, parejaUsuario: message.author.id})
            await nuevoDos.save()
        }

    } else if (collected.content.toLowerCase() === "rechazo"){ 

        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`<:error:755652678285131848> Oh no... Parece que ${usuario} ha rechazado la propuesta de ${message.author} 💔 No podemos decir **Felicidades Shinji** en esta ocasión. Hasta escucho el crujido de ese corazón.`)
            .setColor("RED")
    );

    }

});

collector.on("end", collected => { 
    if (collected.size === 0) return message.channel.send(new MessageEmbed()
        .setDescription(`⏰ Parece que ${usuario} ha huido de esta propuesta...`)
        .setColor("RED")
        );

});

    }
}