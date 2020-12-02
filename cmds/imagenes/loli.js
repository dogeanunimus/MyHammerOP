const Discord = require('discord.js');//definimos el modulo=> discord.js
const Canvas = require('canvas');//definimos el modulo=> canvas

module.exports = {
    config: {
        nombre: "loli",
        alias: ["lol"],
        categoria: "Imágenes",
        descripcion: "Te da una licencia para tener lolis",
    },

    run: async (client, message, args) => {
        const mencionUno = message.mentions.members.first() || 
        message.guild.members.resolve(args[0]) || message.member;
        if (!mencionUno) return message.channel.send('Menciona a alguien o agrega una ID')//mensaje q devuelve si no menciona a un user


	const canvas = Canvas.createCanvas(512, 384);//el tamaño de la imagen
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://media.discordapp.net/attachments/620862801963122729/765932977266884608/44bb31b2b75cb8ebb3a0e95b6560abc8f9c93b81_00.png');//cargamos la imagen de drake
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);//establecemos esa imagen como fondo

	const avatar = await Canvas.loadImage(mencionUno.user.displayAvatarURL({ format: 'png' }));//cargamos el avatar nuestro

	ctx.drawImage(avatar, 252, 97, 259, 264);//aqui muestra la posicion y el tamaaño del avatar del mencionado
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'loli.png');//creamos el attachment

	message.channel.send(attachment);//mandamos la imagen


    }
}