const Discord = require('discord.js');

module.exports = {
    config: {
        nombre: "createrole",
        alias: ["create"],
        categoria: "Lootboxes",
        descripcion: "Crea un role personalizado",
    },

    run: async (client, message, args) => {
        if(!message.member.roles.cache.has("757706476713148457")) return;
if(message.channel.id != '337264623214657536') return message.channel.send("¡Oops! No esta permitido usar este comando aquí.")

let esperando = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription("¡Agrega el nombre que quieres que tenga tu role!")
.addField("<:esperando:755652706873507860> • **Nota** `:`", "El nombre del role debe respetar las reglas del servidor. También no debe pasar de los 20 caracteres.")
.setFooter("Tienes 120 segundos para escribir el nombre de tu role.", client.user.displayAvatarURL())
.setTimestamp()
.setColor("#09d8eb")

let tardo = new Discord.MessageEmbed()
.setDescription(`<:error:755652678285131848> Tardaste mucho... Vuelve a usar el comando [${message.author}]`)
.setColor("RED")

let limite = new Discord.MessageEmbed()
.setDescription("<:error:755652678285131848> ¡Alto! Recuerda que no debe de pasar los 20 caracteres. Vuelve a usar el comando.")
.setColor("RED")

let color = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription("¡Genial! Ahora agrega el color que quieras que tenga tu role. Si es igual al color de los roles del staff este sera cambiado a otro color.")
.addField("`🧪` El color lo debes tomar en formato HEX, ejemplo:  #e3f144", "[Página para obtener le código HEX del color que quieras.](https://htmlcolorcodes.com/es/)")
.setFooter("Tienes 120 segundos para escribir el color de tu role.", client.user.displayAvatarURL())
.setTimestamp()
.setColor("09d8eb")

let channel = message.channel  
let filtro = msg => msg.author.id === message.author.id;  

let mensaje_array = await message.channel.send(esperando)
const array1 = await channel.awaitMessages(filtro, {max: 1, time: 120000}) 
if(array1.size < 1) return message.channel.send(tardo) 
let resultado_array1 = await array1.first().content; 
if(resultado_array1.length > 20) return message.channel.send(limite)
mensaje_array.delete()

let mensaje_array2 = await message.channel.send(color) 
const array2 = await channel.awaitMessages(filtro, {max: 1, time: 120000}) 
if(array2.size < 1) return message.channel.send(tardo)
let resultado_array2 = await array2.first().content; 
mensaje_array2.delete() 


let pantalla = new Discord.MessageEmbed()
.setDescription("<:esperando:755652706873507860> Creando role personalizado... Espere un momento.")
.setColor("#09d8eb")

message.channel.send(pantalla).then(m => setTimeout(() => m.delete(), 3000))


const role = await message.guild.roles.create({

    data: {name: `${resultado_array1}`, color: `${resultado_array2}`, permissions: 0, position: 79}

  });

let creacion = new Discord.MessageEmbed()
.setDescription(`<:correcto:755576359329464350> El role ${role} fue creado y agregado en tu perfil correctamente.`)
.setColor("GREEN")
.setTimestamp()
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))

let registroCreacion = new Discord.MessageEmbed()
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setAuthor("¡Nuevo role personalizado creado!", client.user.displayAvatarURL())
.setDescription(`**❯❯ Creado por el usuario** ${message.author}.`)
.addField("`✏️`**• Datos** `:`", '`🥎`**Nombre del role: **<@&'+role+'>')
.addField("`📌`**• ID ROLE:** `:`", '`'+role.id+'`')
.setTimestamp()
.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setColor('#ff6100')

client.channels.cache.get("598302586092781568").send(registroCreacion)
message.member.roles.remove("757706476713148457")
message.member.roles.add(role)
message.channel.send(creacion)
    }
}