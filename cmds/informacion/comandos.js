const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const PrefixDB = require('../../databases/models/prefixes.js');

module.exports = {
    config: {
        nombre: "comandos",
        alias: ["commands", "list", "helpcommands", "lista"],
        categoria: "Información",
        descripcion: "Mira la lista de todos los comandos cargados en el bot",
    },


    run: async (client, message, args) => {
        
        let res = await PrefixDB.findOne({guild: message.guild.id}).exec() 
        let prefix = res ? res.prefix : ".";
        
        const readdir = fs.readdir;
        const carpeta = args.join(" ");

        if (!carpeta) {
            const embed = new MessageEmbed()
            .setAuthor(`👤 • ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`¡Hola! **${message.author.tag}** para poder acceder a la lista de comandos de una categoría en específico usa **${prefix}comandos <categoría>** para desplegar.`)
            .addField("<:correcto:755576359329464350> • Categorías [ 7 ]", '`⚒️` ᘛ ┆ `moderacion` Mantener el orden del servidor\n`📖` ᘛ ┆ `informacion` Muestra información de cosas útiles\n`📸` ᘛ ┆ `imagenes` Módulos de búsqueda y de edición\n`🔲` ᘛ ┆ `roblox` Información de jugadores en ROBLOX\n`⚙️` ᘛ ┆ `configuracion` Establecer configuraciones\n`❤️` ᘛ ┆ `interaccion` Interactuar con miembros del servidor\n`📦` ᘛ ┆ `lootboxes` Sistema de cofres para ganar')
            .setFooter(`Recuerda que el prefijo en este servidor es ${prefix}`, client.user.displayAvatarURL())
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            return message.channel.send(embed);
        }

        readdir(`./cmds/${carpeta}/`, (err, archivos) => {

            try {

                const embed = new MessageEmbed()
                .setAuthor(`👤 • ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                .addField('`📑` • Lista de la categoría '+carpeta.toLowerCase()+' **['+archivos.length+']**', "```• "+archivos.toString().replace(/[,]/ig, "").split('.js').slice(0).join(' • ')+"```")
                .setColor(message.member.displayHexColor)
                .setFooter(`Usa el comando ${prefix}help <comando> para ver información de este.`, client.user.displayAvatarURL())
                return message.channel.send(embed);
            
            } catch (error) {

                const embed = new MessageEmbed()
                .setDescription("<:correcto:755576359329464350> ¡Esa categoría no existe!")
                .setColor("RED")
                message.channel.send(embed).then(m => {
                    m.delete({timeout: 10000});
                });
            }
        });
    
    }
}