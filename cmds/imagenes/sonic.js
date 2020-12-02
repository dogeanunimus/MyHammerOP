const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    config: {
        nombre: "sonic",
        alias: ["son"],
        categoria: "Imágenes",
        descripcion: "Muestra una imagen con texto SEGA y Sonic meme",

    },

    run: async (client, message, args) => {
        const url = 'https://cdn.discordapp.com/attachments/750461925099307129/757437842719768707/images.jpeg' // esta url es la de la imagen de Sonic Says, si quieres puedes descargarla para meterla directamente en tu proyecto.
        const canvas = Canvas.createCanvas(751, 409) // creamos un canvas de 751 x 409 para que la imagen quede perfecta
const ctx = canvas.getContext('2d') // el contexto

const bg = await Canvas.loadImage(url) // cargamos la imagen en canvas
ctx.drawImage(bg, 0, 0) // la dibujamos en todo el canvas

let texto = args.join(' ') // variable para args.join por comodidad
if(!texto) return message.channel.send('Olvidaste poner un texto.') // si no hay texto retorna

// Ahora la parte de LOS SALTOS DE LINEA
let textos = texto.split('') // spliteamos texto por cada espacio
let texto_total = [] // un array del texto total, lo de texto total luego se entendera
let longitud_maxima = 25; // la longitud maxima antes de un salto de linea
for(let i = 0; i <= textos.length; i++){ //un for
texto_total.push(textos[i]) // pusheamos todos los textos al array total
if(i === longitud_maxima){ // si i es igual a la longitud maxima
texto_total.push('\n') // se pushea un salto de linea al array
longitud_maxima = longitud_maxima + 25 // y duplicamos longitud maxima.
}
}
// como dije antes, esto para poner cada cierto numero de caracteres un salto de linea y que no se nos vaya el texto.
ctx.font = '40px Sega' // la fuente puede ser cualquiera yo usare una que es literalmente la de Sonic, se llama NiseSegaSonic.
ctx.fillStyle = '#fff' // texto color blanco
ctx.textAlign = 'center' // el texto centrado

ctx.fillText(texto_total.join(''), 214, 110.5) // y escribimos el texto que es texto total unido

let att = new MessageAttachment(canvas.toBuffer(), 'sonic.png') // creamos el attachment del buffer del canvas y...
message.channel.send(att) //Listo!
    }
}
