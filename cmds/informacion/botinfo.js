const moment = require("moment");
require('moment-duration-format');
const os = require('os');
const Discord = require('discord.js');

module.exports = {
	config: {
		nombre: "botinfo",
		alias: ["bot"],
		descripcion: "Comando para mostrar la información del bot",
		categoria: "Información",
	},

	run: async (client, message, args, guild) => {


	const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");

		let usuario = message.author;

		let botinfo = new Discord.MessageEmbed()
		.setAuthor(`🤖 ${client.user.tag} información`, client.user.displayAvatarURL())
		.setThumbnail(client.user.displayAvatarURL())
		.setDescription(`**¡Hola!** Soy **${client.user.tag}** un bot multiproposito para este servidor llamado **${message.guild.name}**`)
		.addField("`⚙️` ❯❯ Mi desarrollador ➜", "> <:dev:726253018713948160>〘 <@450492084894564353> 〙")
		.addField("`✅` ❯❯ Información sobre mi desarrollo ➜", `>>> <:discord:772940016267034654> • Versión: **1.0**\n<:javascript:775191456700825612> • Lenguaje: **Javascript**\n<:nodejs:775192158680252467> • Módulo: **Discord.js ${Discord.version}**\n<:uptime:775193433492684850> • Uptime:〘 **${actividad}** 〙\n<:verificar:725840388744675339> • Ping:〘 **${client.ws.ping} ms** 〙`)
		.addField("`🖥️` ❯❯ Acerca del equipo ➜", `\`\`\`js\n• CPU: ${os.cpus().map(i => `${i.model}`)[0]} Velocidad: ${os.cpus().map(i => `${i.speed}`)[0]} MHz\n• Cores: ${os.cpus().length}\n• Arch: ${os.arch}\n• Plataforma: ${os.platform()}\n• Memoria: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} GB\`\`\``)
		.addField("`⌨️` ❯❯ Porcentaje de creación ➜", "[▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱ 53%](https://discord.com/channels/337261425082761238/337267617264041994/692954281690529803)")
		.setColor(message.member.displayHexColor)
		.setTimestamp()
		.setFooter(`Pedido por: ${usuario.tag}`, usuario.displayAvatarURL({dynamic: true}))
		message.channel.send(botinfo);

	}
}