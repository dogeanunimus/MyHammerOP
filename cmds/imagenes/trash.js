const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    config: {
        nombre: "trash",
        alias: ["basura"],
        categoria: "Imágenes",
        descripcion: "Muestra avata del usuario a punto de ser borrado",
    },

    run: async (client, message, args) => {
        let user = message.mentions.users.first();
if(!user) return message.channel.send("Menciona a un usuario")//Si el usuario no menciona a otro retorna

const imagen = Canvas.createCanvas(536,300); //Definimos imagen
const ctx = imagen.getContext('2d'); //ctx

const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/744987188583858267/747444180506247228/Trash.png');//Definimos la imagen de fondo
ctx.drawImage(background, 0, 0, imagen.width, imagen.height);

const mencionadoavatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg', size: 2048, dynamic: true }));//Cargamos el avatar del mencionado
ctx.drawImage(mencionadoavatar, 86, 114, 140, 170);//Construimos la imagen (Tamaño y posicion)
  
const attachment = new Discord.MessageAttachment(imagen.toBuffer(), 'trash.png');//Nuevo attachment
message.channel.send(attachment)//Enviamos


    }
}