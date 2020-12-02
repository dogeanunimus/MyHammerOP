const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    config: {
        nombre: "match",
        alias: ["icon"],
        categoria: "Imágenes",
        descripcion: "Une imagen con otro usuario y visualiza como se ve",
    },

    run: async (client, message, args) => {
        const mencionUno = message.mentions.members.first() || 
  message.guild.members.resolve(args[0]) 
if(!mencionUno) return message.channel.send('Menciona a alguien o agrega una ID')//mensaje q devuelve si no menciona a un user

const mencionDos = message.mentions.members.last() || 
  message.guild.members.resolve(args[1])
if(!mencionDos)return message.channel.send('Menciona a alguien o agrega una ID')//mensaje q devuelve si no menciona a un user

const canvas = Canvas.createCanvas(520, 262);
	const ctx = canvas.getContext('2d');

	
	const background = await Canvas.loadImage('https://media.discordapp.net/attachments/646072711797538818/762536663112089631/mathcicon.PNG');//cargamos la imagen de drake
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);//establecemos esa imagen como fondo

	const avatar = await Canvas.loadImage(mencionUno.user.displayAvatarURL({ format: 'png' }));//cargamos el avatar nuestro
		const avatar2 = await Canvas.loadImage(mencionDos.user.displayAvatarURL({ format: 'png' }));//cargamos el avatar del mencionado

	ctx.drawImage(avatar, 2, 1, 259, 264);//aqui muestra la posicion y el tamaaño del avatar del mencionado
ctx.drawImage(avatar2, 261, 1, 259, 264);//aqui muestra la posicion y el tamaaño del avatar nuestro
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'match.png');//creamos el attachment

	message.channel.send(attachment);//mandamos la imagen
    }
}