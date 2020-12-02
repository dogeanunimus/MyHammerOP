const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');

const used = new Map();

module.exports = {
    config: {
        nombre: "img",
        alias: ["search", "imagen", "buscar"],
        categoria: "Imágenes",
        descripcion: "Busca una imagen en Google",
    },

    run: async (client, message, args) => {
        const Duration = require("humanize-duration");
const cooldown = used.get(message.author.id);

    if(cooldown) {           
        const remaining = Duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true});
      
       const embed = new Discord.MessageEmbed() 
     .setDescription(`<:error:755652678285131848> Ya usaste este comando. Espera ${remaining} para volver a usarlo.`)
     .setColor("RED")
       
        return message.channel.send({embed}).then(async(message) => {
             setTimeout(() => {
             message.delete();
           }, 7000)
           });  
       
        }
       else{     
                                      
         used.set(message.author.id, Date.now() +   10000);
         setTimeout(()=> used.delete(message.author.id),  10000);
       } 
     
message.channel.startTyping(5000)
message.channel.stopTyping(5000)

var parts = message.content.split(" "); 
const palabras = ["mia khalifa", "joto", "NSFW Art", "porn", "rule34", "creampie", "Dildos", "vaginitis", "Shoujo Ramune", "2 girls 1 cup", "Sex toys", "juguetes sexuales", "roblox porn", "Degloving", "Blue Waffle", "gore", "lolicon", "hentaird.tv", "sopa de murcielago", "sexo anal","big cock", "desnudos", "cum", "hentai heaven", "hentaila", "paja", "dildo", "condon", "porno", "fuck", "hentai", "sexo anal", "sexo", "pene", "vagina", "consolador", "macaco", "desmembrada", "organos reales", "nsfw", "muertas", "pollas", "sex", "piroca", "futa", "penis", "pussy", "yuri", "yaoi", "yaoi", "porn"]; 

var search = parts.slice(1).join(" "); 
if(!search) return message.channel.send("Por favor agregar algo para que pueda buscar."); 
if(palabras.some(z => message.content.includes(z))) { 
message.delete();

   return message.channel.send(new Discord.MessageEmbed()
   .setDescription(`<:error:755652678285131848> ¡Esa palabra esta prohibida! [${message.author}]`)
   .setColor("RED")
); 
}
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
        request(options, async function(error, response, responseBody) {
        if (error) {
            return;
        }
        $ = cheerio.load(responseBody);
    
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {
            return message.channel.send("No encontre un resultado");
        }


        let i = 0;
        let max = urls.length - 1;
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .addField("`🔎` Resultados sobre:", '〘 '+search+' 〙')
        .setFooter(`${i + 1}/${max + 1}`, "https://media.discordapp.net/attachments/646072711797538818/733811671109206056/d9FzzJbA7UNGzZs2LBhQzz4P7gp2NndMM1XAAAAAElFTkSuQmCC.png")
        .setImage(urls[i])
        .setFooter(message.author.username, "https://media.discordapp.net/attachments/646072711797538818/733811671109206056/d9FzzJbA7UNGzZs2LBhQzz4P7gp2NndMM1XAAAAAElFTkSuQmCC.png")
        .setTimestamp() 
        .setColor("BLUE")
         message.channel.stopTyping(5000)

        const filter = (reaction, user) => {
            return ['◀️', '▶️', '⏹️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        let msg = await message.channel.send(embed);
        await msg.react('◀️');
        await msg.react('▶️');
        await msg.react('⏹️');

        let collector = msg.createReactionCollector(filter, { idle: 60000 })
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '▶️') {
                await reaction.users.remove(user.id);
                if (max !== i){
                    i++
                    embed.setImage(urls[i])
                    embed.setFooter(`${i + 1}/${max + 1}`, "https://media.discordapp.net/attachments/646072711797538818/733811671109206056/d9FzzJbA7UNGzZs2LBhQzz4P7gp2NndMM1XAAAAAElFTkSuQmCC.png")
                    await msg.edit(embed);
                }
            }
            if (reaction.emoji.name === '◀️') {
                await reaction.users.remove(user.id);
                if (i !== 0) {
                    i--
                    embed.setImage(urls[i])
                    embed.setFooter(`${i + 1}/${max + 1}`, "https://media.discordapp.net/attachments/646072711797538818/733811671109206056/d9FzzJbA7UNGzZs2LBhQzz4P7gp2NndMM1XAAAAAElFTkSuQmCC.png")
                    await msg.edit(embed);
                }
            }
            
            if (reaction.emoji.name === '⏹️') {
              await reaction.users.remove(user.id);
              collector.stop();
                }


            })
                collector.on('end', collected => msg.reactions.removeAll())

        });



    }
}