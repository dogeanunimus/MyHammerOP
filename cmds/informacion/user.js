const Discord = require('discord.js');
const sourcebin = require('sourcebin');

module.exports = {
    config: {
        nombre: "user",
        alias: ["u"],
        categoria: "Información",
        descripcion: "Ver la información de un usuario en el servidor"
    },
    run: (client, message, args) => {
        message.channel.startTyping(5000)
        message.channel.stopTyping(5000)

	const autor = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		if(autor.user.bot) {

			let estadosBot = {
        "online": "<:onlains:772942790187024434> En Línea",
        "idle": "<:away:772942880565100555> Ausente",
        "dnd": "<:dnd:772943040036864050> No molestar",
        "offline": "<:offline2:772942790036029440> Invisible/Desconectado"
    }

			let botUser = new Discord.MessageEmbed()
			.setThumbnail(autor.user.displayAvatarURL({dynamic: true}))
			.setAuthor(`👤 ${autor.user.username}#${autor.user.discriminator} información`, autor.user.displayAvatarURL({dynamic: true}))
			.addField("`✅` ❯❯ Información principal ➜ ", `>>> <:apodo2:772941296326279178> • Apodo: **${autor.nickname !== null && undefined ? autor.nickname : '**No tiene apodo este bot**'}**\n<:apodo:772938219204640819>  • ID: **${autor.user.id}**\n<:rich:772945192356413440> • Estado: **${estadosBot[autor.user.presence.status]}**\n<:discord:772940016267034654> • Creación de la cuenta: **__${formatDate('DD/MM/YYYY - HH:mm:ss', autor.user.createdAt)}__**\n<a:entrada:772944344789024808> • Se unió al servidor: **__${formatDate('DD/MM/YYYY - HH:mm:ss', autor.joinedAt)}__**\n<:state:773048980912341032> • Estado: **${autor.user.presence.activities != "" ? autor.user.presence.activities : "**No esta haciendo algo**"}**`)
			.addField("`⚒️` ❯❯ Información técnica ➜ ", `>>> <:bot:772946357219753984> • ¿Es un bot? **${autor.user.bot ? '**Sí**' : '**No**'}**\n<a:color:772946339230384128> • Color:**〘 ${autor.displayHexColor} 〙**\n<:alto:772947404424871966> • Role más alto: **${autor.roles.highest}**\n<:pinned:772947382430072863> • Role anclado en la lista: **${autor.roles.hoist != null ? autor.roles.hoist : "**Ningún role anclado**"}**`)
			.setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTimestamp()
			.setColor(autor.displayHexColor)



			return message.channel.send(botUser)

		}

		let estados = {
        "online": "<:onlains:772942790187024434> En Línea",
        "idle": "<:away:772942880565100555> Ausente",
        "dnd": "<:dnd:772943040036864050> No molestar",
        "offline": "<:offline2:772942790036029440> Invisible/Desconectado"
    }

		let BADGES = {

        DISCORD_PARTNER: '<:DiscordPartner:742904512506888252>',
        HYPESQUAD_EVENTS: '<:hypesquadevents:742905174166863934>',
        BUGHUNTER_LEVEL_1: '<:BugHunter:742904470186491916>',
        HOUSE_BRAVERY: '<:bravery:742904470102605875>',
        HOUSE_BRILLIANCE: '<:brillancie:742904469955674214>',
        HOUSE_BALANCE: '<:balance:742904491375853659>',
        EARLY_SUPPORTER: '<:EVA_DISCORDNITROOLD:741710082621964319>',
        BUGHUNTER_LEVEL_2: '<:BugHunter:742904470186491916>',
        VERIFIED_DEVELOPER: '<:dev:726253018713948160>'
        
    }    


		const badgesuser = autor.user.flags != 0 ? autor.user.flags.toArray().map(b => BADGES[b]).join(' | ') : "**No tiene medallas**"


		 function formatDate (template, date) {
    	 var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      	 date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
     	 return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
         return template.split(specs[i]).join(item)
      	 }, template)

    }
		sourcebin.create([{ name: 'Lista de todos los permisos que tiene el usuario.', content: `${autor.permissions.toArray().join('\n')}`, languageId: 'text' }]).then(source => {			


		const informacion = new Discord.MessageEmbed()
		.setThumbnail(autor.user.displayAvatarURL({dynamic: true}))
		.setAuthor(`👤 ${autor.user.username}#${autor.user.discriminator} información`, autor.user.displayAvatarURL({dynamic: true}))
		.addField("`✅` ❯❯ Información principal ➜ ", `>>> <:apodo2:772941296326279178> • Apodo: **${autor.nickname !== null ? autor.nickname : '**No tiene un apodo**'}**\n<:apodo:772938219204640819>  • ID: **${autor.user.id}**\n<:rich:772945192356413440> • Estado: **${estados[autor.user.presence.status]}**\n<:discord:772940016267034654> • Creación de la cuenta: **__${formatDate('DD/MM/YYYY - HH:mm:ss', autor.user.createdAt)}__**\n<a:entrada:772944344789024808> • Se unió al servidor: **__${formatDate('DD/MM/YYYY - HH:mm:ss', autor.joinedAt)}__**\n<:state:773048980912341032> • Estado: **${autor.user.presence.activities != "" ? autor.user.presence.activities : "**No esta haciendo algo**"}**\n<:estado:772938813197778944> • Estado personalizado: **${autor.user.presence.activities.length > 0 ? autor.user.presence.activities[0].state : '**Sin estado**'}**\n<:hypesquadevents:742905174166863934> • Medallas: 〘 ${badgesuser} 〙`)
		.addField("`⚒️` ❯❯ Información técnica ➜ ", `>>> <:bot:772946357219753984> • ¿Es un bot? **${autor.user.bot ? '**Sí**' : '**No**'}**\n<a:color:772946339230384128> • Color:**〘 ${autor.displayHexColor} 〙**\n<:alto:772947404424871966> • Role más alto: **${autor.roles.highest}**\n<:pinned:772947382430072863> • Role anclado en la lista: **${autor.roles.hoist != null ? autor.roles.hoist : "**Ningún role anclado**"}**\n<:boost:772947346266259466> • ¿Boostea? ${autor.premiumSince ? '**Sí**' : '**No**'}`)
		.addField("`🎈` ❯❯ Lista de roles: ➜ ", `**${autor.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(" **|** ") != 0 ? autor.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(" **|** ") : ">>> •〘 No tiene ningún role 〙"}**`)
		.addField("`⚙️` ❯❯ Permisos usuario en Sourcebin ➜", `>>> <:join_arrow:772950616867209237>〘 **[LISTA PERMISOS DE USUARIO](${source.url})** 〙`)
		.addField("`📷` ❯❯ Opciones avatar ➜ ", `>>> <:join_arrow:772950616867209237> 〘 **[GIF](${autor.user.displayAvatarURL({dynamic: true})})** **|** **[WEBP](${autor.user.displayAvatarURL()})** **|** **[JPG](${autor.user.displayAvatarURL({format: "jpg"})})** **|** **[PNG](${autor.user.displayAvatarURL({format: "png"})})** 〙`)
		.setColor(autor.displayHexColor)
		.setTimestamp()
		.setFooter(client.user.tag, client.user.displayAvatarURL())

		message.channel.send(informacion);
    

        });
    
    }
}