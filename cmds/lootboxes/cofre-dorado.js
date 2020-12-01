const Discord = require('discord.js');

module.exports = {
    config: {
        nombre: "cofre-dorado",
        alias: ["cd"],
        categoria: "Lootboxes",
        descripcion: "Abre un cofre dorado del sistema de lootbox",
    },

    run: (client, message, args) => {
        if(!message.member.roles.cache.has("598292805026185246")) return;
if(message.channel.id != '337264623214657536') return message.channel.send("¡Oops! No esta permitido usar este comando aquí.")

let registroImagen = new Discord.MessageEmbed()
.setAuthor("¡Nuevo registro a sido creado!", client.user.displayAvatarURL())
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setDescription(`**❯❯ Pase de imágenes para el usuario** ${message.author}.`)
.addField("`📝` • Datos`:`",  '`📅`**Duración:** 3 días\n`🌐`**ID:** `'+message.author.id+'`')
.setTimestamp()
.setFooter("Fecha + 3 días", message.author.displayAvatarURL())
.setColor("ecfe15")

let registroRole = new Discord.MessageEmbed()
.setAuthor("¡Nuevo registro a sido creado!", client.user.displayAvatarURL({dynamic: true}))
.setDescription(`**❯❯ Role personalizado para el usuario** ${message.author}.`)
.addField("`📝` • Datos`:`", '`📅`**Duración:** 3 días\n`🌐`**ID:** `'+message.author.id+'`')
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setFooter("Fecha + 3 días", message.author.displayAvatarURL())
.setTimestamp()
.setColor("ecfe15")

let cargando = new Discord.MessageEmbed()
.setAuthor("¡Sistema de niveles!", client.user.displayAvatarURL())
.setDescription("<:correcto:755576359329464350> ❯❯ **Cargando... Mucha suerte pequeño usuario.**")
.setImage("https://media.discordapp.net/attachments/749317035162337330/749482273002487838/orito.gif?width=425&height=425")
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setColor("ecfe15") 

let imagen = new Discord.MessageEmbed()
.setAuthor("¡Sistema de niveles!", client.user.displayAvatarURL())
.setDescription(`🎉 ❯❯ **¡Felicidades!** ${message.author} acabas de obtener un pase de imágenes.`)
.addField("`🏆` • Datos sobre el premio - `:`", "`🗓️` Duración: **3 días**\n`🔹` Ventajas: Mandar imágenes en el canal principal <#620862801963122729>.")
.setImage("https://media.discordapp.net/attachments/749317035162337330/749484211127320626/imageOro.gif?width=425&height=425")
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setColor("ecfe15")

let	role = new Discord.MessageEmbed()
.setAuthor("¡Sistema de niveles!", client.user.displayAvatarURL())
.setDescription(`🎉 ❯❯ **¡Felicidades!** ${message.author} acabas de obtener un role personalizado.`)
.addField("`🏆` • Datos sobre el premio - `:`", "`🗓️` Duración: **3 días**\n`🔹` Ventajas: Crear un role con el nombre y color que tu quieras.")
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.addField("`📝` • Dato - `:`", "`✏️` Para poder crear tu role usa el comando `/createrole` esto desplazara una guía para poder crearlo.")
.setImage("https://media.discordapp.net/attachments/749317035162337330/749484778192896091/OroRole.gif?width=425&height=425")
.setTimestamp()
.setColor("ecfe15")

let nada1 = new Discord.MessageEmbed()
.setAuthor("¡Sistema de niveles!", client.user.displayAvatarURL())
.setDescription(`🍪 ❯❯ **¡Oops!** Lamentablemente ${message.author} obtuviste nada; pero si una **GALLETA**.`)
.setImage("https://media.discordapp.net/attachments/749317035162337330/749484431718481920/nadaOro.gif?width=425&height=425")
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setColor("ecfe15")

let nada2 = new Discord.MessageEmbed()
.setAuthor("¡Sistema de niveles!", client.user.displayAvatarURL())
.setDescription(`🍪 ❯❯ **¡Oops!** Lamentablemente ${message.author} obtuviste nada; pero si una **GALLETA**.`)
.setImage("https://media.discordapp.net/attachments/749317035162337330/749484431718481920/nadaOro.gif?width=425&height=425")
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setColor("ecfe15")

let nada3 = new Discord.MessageEmbed()
.setAuthor("¡Sistema de niveles!", client.user.displayAvatarURL())
.setDescription(`🍪 ❯❯ **¡Oops!** Lamentablemente ${message.author} obtuviste nada; pero si una **GALLETA**.`)
.setImage("https://media.discordapp.net/attachments/749317035162337330/749484431718481920/nadaOro.gif?width=425&height=425")
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setColor("ecfe15")

let nada4 = new Discord.MessageEmbed()
.setAuthor("¡Sistema de niveles!", client.user.displayAvatarURL())
.setDescription(`🍪 ❯❯ **¡Oops!** Lamentablemente ${message.author} obtuviste nada; pero si una **GALLETA**.`)
.setImage("https://media.discordapp.net/attachments/749317035162337330/749484431718481920/nadaOro.gif?width=425&height=425")
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setColor("ecfe15")


let cofres = [imagen, role, nada1, nada2, nada3, nada4]
let random = cofres[Math.floor(Math.random() * cofres.length)]

message.member.roles.remove("598292805026185246")
message.channel.send(cargando).then(m => setTimeout(() => m.edit(random), 3000))

if(random === imagen) {
message.member.roles.add("598295827345047565")
client.channels.cache.get("598302586092781568").send(registroImagen)
}

if(random === role) {
message.member.roles.add("757706476713148457")
client.channels.cache.get("598302586092781568").send(registroRole)
}

 }
}