const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	config: {
		nombre: "test",
		alias: ["t"],
		descripcion: "Para hacer tests.",
		categoria: "verificacion"
	},

	run: async (client, message , args) => {
		let robloxUsername = args[0];
		if(!robloxUsername) {
			return message.channel.send("¡Agrega tu nombre de usuario!");
		}

		let codigo = "Codigo de prueba";

		let usernameAPI = await fetch(`https://api.roblox.com/users/get-by-username?username=${robloxUsername.replace("#", "")}`,  {

   		 method: 'GET',
        
        'Accept': 'application/json'

		});

		const profile = await usernameAPI.json();
		const status = await fetch(`https://users.roblox.com/v1/users/${profile.Id}/status`,  {
  
    	method: 'GET',
          
        'Accept': 'application/json'

		});
	
		let estado = await status.json();

		if(estado.status == codigo) {
			let role = message.guild.roles.cache.find(x => x.name == 'PRUEBA');
			message.member.roles.add(role)
			message.member.setNickname(robloxUsername).catch(e => message.channel.send("No puedo actualizar el apodo de este usuario."))
			message.channel.send("¡Te has verificado correctamente!");

				}

		else {

			message.channel.send("No tienes el codigo en tu estado.");

		}

	}
}