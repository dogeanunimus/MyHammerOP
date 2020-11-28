const Discord = require('discord.js');
const moongose = require('mongoose');
const fetch = require('node-fetch');
const RobloxUser = require('../../databases/models/dbroblox.js');
const codeVerificationRB = require('../../util/codigos.js');
const conteo = require('../../databases/models/contador.js');

module.exports = {
    config: {
        nombre: "verify",
        alias: ["v"],
        categoria: "Verificación",
        descripcion: "Comando de verificacion en roblox con MongoDB"
    },
    
    run: async (client, message, args, guild) => {

        let roleVerificado = message.guild.roles.cache.find(x => x.name == 'VerificadoSII');

		if (message.member.roles.cache.has('782087854905884682')) {
			return;
        }

        let usuarioUso = await conteo.findOne({usuario: message.author.id}).exec()
        if (!usuarioUso) {
            return message.channel.send(new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription("<:error:755652678285131848> **¡Hey!** Primero tienes que generar un código para poder verificarte. Usa el comando **/key** para poder obtenerlo y seguir con la verificación.")
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor("RED")
            );
        }


        let existeDueño = await RobloxUser.findOne({dueño: message.author.id}).exec()
            if (existeDueño) {
                message.member.roles.add(roleVerificado);
                return message.channel.send(new Discord.MessageEmbed()
                .setAuthor("¡Verificación TitanHammerArmy!", client.user.displayAvatarURL())
                .addField('\u200B', `>>> <:correcto:755576359329464350> ¡Parece que el usuario **${message.author}**  decidió volver al servidor **${message.guild.name}**!`)
                .addField('\u200B','>>> `🎈` **❯❯  Roles entregados:** <@&'+roleVerificado+'>')
				.setColor("RED")
                .setTimestamp()
                .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
				);
            }

        let username = args[0];
			if (!username) {
         	   return message.channel.send(new Discord.MessageEmbed()
			   .setDescription("<:error:755652678285131848> **¡Hey!** Agrega tu nombre de jugador en ROBLOX.")
			   .setColor("RED")
				);
				}
				
        let usernameAPI = await fetch(`https://api.roblox.com/users/get-by-username?username=${username.replace("#", "")}`,  {

			method: 'GET',
			'Accept': 'application/json'

			});
	
			const profile = await usernameAPI.json();
			const status = await fetch(`https://users.roblox.com/v1/users/${profile.Id}/status`,  {
	  
			method: 'GET', 
			'Accept': 'application/json'
			});
            
            let estado = await status.json();            

            let existe = await RobloxUser.findOne({nombreCuenta: `${username}`})
            if (existe) {
                return message.channel.send(new Discord.MessageEmbed()
                .setDescription("<:error:755652678285131848> **¡Hey!** Esta no es tu cuenta de roblox. El nombre de jugador que acabas de agregar ya está registrado. Agrega tu cuenta.")
                .setColor("RED")  
                );
            }
            
			if (estado.status == codeVerificationRB.codigo.find(x => x == estado.status)) {
            let apodo = args[1];
            if (apodo === 'si') {
                message.member.setNickname(username);
                message.channel.send(new Discord.MessageEmbed()
                .setDescription(`${message.author} Estableció su nick de roblox como apodo.`)
                .setColor("GREEN")
                    );
                }
    
                 else if (!apodo) {
                    message.member.setNickname(username);
                    
                }
            
                else if (apodo === 'no') {
                    message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`¡${message.author} No estableció un cambio de apodo!`)
                    .setColor("GREEN")
                    );
                }
    
                let nuevoUsuario = new RobloxUser({dueño: message.author.id, nombreCuenta: username});
                await nuevoUsuario.save();
                
                    message.member.roles.add(roleVerificado);
                    return message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`<:correcto:755576359329464350> ¡El usuario ${message.author} se ha verificado correctamente!`)
                    .setColor("GREEN")
                    );
        
                    
                        }
        
                else {
        
                     return message.channel.send(new Discord.MessageEmbed()
                        .setDescription("<:error:755652678285131848> **¡No encontré el código en tu descripción!** Verifica que copiaste bien el código, también puedes verificar si tu nombre de usuario lo escribiste bien.") 
                        .setColor("RED")
                    );
        
                }
    }
}