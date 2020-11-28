
const clientN = require("nekos.life") //requerimos nekos.life
const nekos = new clientN()//nuevo cliente de nekos.lif
const Discord = require('discord.js');
module.exports = { 
    config: {
        nombre: "ping",
        alias: ["t1", "1t"],
        descripcion: "Es para ver tu ping"
    },

  run: async (client, message, args) => {
      let mencionadopoke = message.mentions.users.first()
      let authorpoke = message.author.username
      if(!mencionadopoke) return message.channel.send('Mencione a quien quiere molestar, ' + `${message.author}`)
      if(mencionadopoke === message.author) return message.channel.send ('Si quiere que yo lo moleste escriba m!pokeme')
      if (mencionadopoke.id === client.user.id) {
        const embedpokebot = new Discord.MessageEmbed()
        .setTitle(`${authorpoke}` + ' me esta molestando... :Emote9:')
        .setTimestamp()
        .setColor('FFB900')
        .setImage('')
    
        return message.channel.send(embedpokebot)
      
      } else {

        nekos.sfw.poke().then (neko =>{
          const embedpoke = new Discord.MessageEmbed()
          .setTitle(`${authorpoke}` + ' esta molestando a ' + `${mencionadopoke.username}`)
          .setColor('18FDFA')
          .setTimestamp()
          .setImage(neko.url)
            })

         message.channel.send(embedpoke);
        }
    
        
      }

  }
