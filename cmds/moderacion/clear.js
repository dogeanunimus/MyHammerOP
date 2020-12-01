const Discord = require('discord.js');


module.exports = {
    config: {
        nombre: "clear",
        alias: ["borrar"],
        categoria: "Moderación",
        descripcion: "Elimina mensajes de un canal indicando la cantidad",
    },

    run: async (client, message, args) => {
        let permisosBot = new Discord.MessageEmbed()
.setDescription("<:error:755652678285131848> No tengo permiso para ejecutar este comando.")
.setColor("RED")

let permisosUsuario = new Discord.MessageEmbed()
.setDescription("<:error:755652678285131848> No tienes permiso para ejecutar este comando.")
.setColor("RED")

  if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
  return message.channel.send(permisosBot)
}

if (!message.member.hasPermission('KICK_MEMBERS')) {
  return message.channel.send(permisosUsuario)
}

let canti = new Discord.MessageEmbed()
.setDescription("<:esperando:755652706873507860> Agrega la cantidad de mensajes que debo eliminar.")
.setColor("BLUE")

let numero = new Discord.MessageEmbed()
.setDescription("<:esperando:755652706873507860> ¡Debes agregar un número!")
.setColor("BLUE")

let limite = new Discord.MessageEmbed()
.setDescription("<:correcto:755576359329464350> El máximo de mensajes que puedo borrar es `100`. Se estableció correctamente esa cantidad.")
.setColor("GREEN")

if(!args) return message.channel.send(canti);
let cantidad = parseInt(args[0])

if(!cantidad || isNaN(cantidad)) return message.channel.send(numero) 

if(cantidad > 100){
  message.channel.send(limite)
  cantidad = 100
}

let correcto = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`<:correcto:755576359329464350> Mensajes eliminados correctamente => **${cantidad}**.`)
.setColor("GREEN")
.setTimestamp()
.setFooter(client.user.tag, client.user.displayAvatarURL())

message.channel.messages.fetch({
  limit: cantidad
}).then(mensajes => {
  message.channel.bulkDelete(
    mensajes.filter(m => !m.pinned) 
  ).then(() => {
    message.channel.send(correcto)
  }).catch(e => {
    message.channel.send('Ocurrio un error y no pude borrar los mensajes')
  })
})
    }

}