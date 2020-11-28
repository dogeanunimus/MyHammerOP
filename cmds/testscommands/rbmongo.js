const Discord = require('discord.js');
const moongose = require('mongoose');
const fetch = require('node-fetch');
const RobloxUser = require('../../databases/models/dbroblox.js');

module.exports = {
    config: {
        nombre: "rbmongo",
        alias: ["rb"],
        categoria: "testscommands",
        descripcion: "Comando de verificacion en roblox con MongoDB"
    },
    
    run: async (client, message, args) => {
        let roleVerificado = message.guild.roles.cache.find(x => x.name == 'PRUEBA');

		if (message.member.roles.cache.has('743135075058712697')) {
			return message.channel.send("¡Tu ya estas verificado!");
        }

        let existeDueño = await RobloxUser.findOne({dueño: message.author.id}).exec()
            if (existeDueño) {
                message.member.roles.add(roleVerificado);
				return message.channel.send(new Discord.MessageEmbed()
				.setDescription(`<:correcto:755576359329464350> **¡Bienvenido de vuelta!** ${message.author}`)
				.setColor("GREEN")
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
        
        let codigo = "Codigo de prueba";

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

            //existe dueño
            

            let existe = await RobloxUser.findOne({nombreCuenta: `${username}`})
            if (existe) {
                return message.channel.send(new Discord.MessageEmbed()
                .setDescription("<:error:755652678285131848> **¡Hey!** Esta no es tu cuenta de roblox. El nombre de jugador que acabas de agregar ya está registrado. Agrega tu cuenta.")
                .setColor("RED")  
                );
            }
            
            if(estado.status == codigo) {
	
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
                    .setDescription(`¡${message.author} No estableció un cambio de apodo.`)
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