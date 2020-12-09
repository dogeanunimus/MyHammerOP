const { MessageEmbed } = require('discord.js');
const { searchAmazon, AmazonSearchResult } = require('unofficial-amazon-search');

module.exports = {
    config: {
        nombre: "amazon",
        alias: ["searchamazon", "amzn", "az"],
        categoria: "Información",
        descripcion: "Busca la información de un producto en Amazon",
    },

    run: async (client, message, args) => {
        try {
        let busqueda = args.join(" ");
        if (!busqueda) {
            return message.channel.send("<:error:755652678285131848> ¡Agrega el nombre de un producto para buscarlo!");
        }

        let i = 0;
        let max = busqueda.length - 1;

        let resultado = await searchAmazon(busqueda);
        let producto = resultado.searchResults;

        const embed = new MessageEmbed()
        .setAuthor(`👤 • ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setDescription('`🔍` ᘛ ┆ Encontré: **'+producto[i].title+'**')
        .addField("`🛒` ❯❯ Información del producto:", '`💰` ᘛ ┆ Precio: **'+producto[i].prices[i].price+' $ USD**\n`⭐`ᘛ ┆ Puntuación: `'+producto[i].rating.score+' / 5.0`\n`📲` ᘛ ┆ Enlace al producto: **[Dale clic aquí](https://amazon.com'+producto[i].productUrl+')**')
        .setImage(producto[i].imageUrl)
        .setFooter(`Resultados sobre: ${busqueda}`, "https://images-ext-1.discordapp.net/external/D9nmAOQXemehPHhyyMw3kX1KGS0FPP1rr3EIYcUzhd8/https/lh3.googleusercontent.com/proxy/9Ec9yZF8cmvlJzvvi6b1hfC1eD5kg_aVhHc8Gwcxqn9vv4wnoxAfGMBJirAtD24kwYFUvzySM2_bOjh5SpBsuJcUzsx01UNFiOJNYj4?width=473&height=473")

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
                    try {

                    embed.setDescription('`🔍` ᘛ ┆ Encontré: **'+producto[i].title+'**')
                    embed.fields[0].value = '`💰` ᘛ ┆ Precio: **'+producto[i].prices[0].price+' $ USD**\n`⭐`ᘛ ┆ Puntuación: `'+producto[i].rating.score+' / 5.0`\n`📲` ᘛ ┆ Enlace al producto: **[Dale clic aquí](https://amazon.com'+producto[i].productUrl+')**'
                    embed.setImage(producto[i].imageUrl)
                    embed.setFooter(`${i + 1}/${max + 1}`, "https://images-ext-1.discordapp.net/external/D9nmAOQXemehPHhyyMw3kX1KGS0FPP1rr3EIYcUzhd8/https/lh3.googleusercontent.com/proxy/9Ec9yZF8cmvlJzvvi6b1hfC1eD5kg_aVhHc8Gwcxqn9vv4wnoxAfGMBJirAtD24kwYFUvzySM2_bOjh5SpBsuJcUzsx01UNFiOJNYj4?width=473&height=473")
                    await msg.edit(embed);

                    } catch (error) {
                        return;
                    }
                }
            }
            if (reaction.emoji.name === '◀️') {
                await reaction.users.remove(user.id);
                if (i !== 0) {
                    i--
                    try {
                    embed.setImage(producto[i].imageUrl)
                    embed.setDescription('`🔍` ᘛ ┆ Encontré: **'+producto[i].title+'**')
                    embed.fields[0].value = '`💰` ᘛ ┆ Precio: **'+producto[i].prices[0].price+' $ USD**\n`⭐`ᘛ ┆ Puntuación: `'+producto[i].rating.score+' / 5.0`\n`📲` ᘛ ┆ Enlace al producto: **[Dale clic aquí](https://amazon.com'+producto[i].productUrl+')**'
                    embed.setFooter(`${i + 1}/${max + 1}`, "https://images-ext-1.discordapp.net/external/D9nmAOQXemehPHhyyMw3kX1KGS0FPP1rr3EIYcUzhd8/https/lh3.googleusercontent.com/proxy/9Ec9yZF8cmvlJzvvi6b1hfC1eD5kg_aVhHc8Gwcxqn9vv4wnoxAfGMBJirAtD24kwYFUvzySM2_bOjh5SpBsuJcUzsx01UNFiOJNYj4?width=473&height=473")
                    await msg.edit(embed);
                    
                    } catch (error) {
                        return;
                    }
                }
            }
            
            if (reaction.emoji.name === '⏹️') {
              await reaction.users.remove(user.id);
              collector.stop();
                }


            })
                collector.on('end', collected => msg.reactions.removeAll())

        }catch (error) {
            return message.channel.send("<:error:755652678285131848> No encontré el producto que solicitaste.")
        }
    }
}
