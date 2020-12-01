const Discord = require('discord.js');
const { inspect } = require('util');

module.exports = {
    config: {
        nombre: "deval",
        alias: ["dev"],
        categoria: "Desarrollo",
        descripcion: "Evaluar un código",
    },

    run: async (client, message, args) => {
        if(!"450492084894564353".includes(message.author.id)) return;

        if(!args.join(" ")) {
         return message.channel.send("Agrega algo para evaluar.");
        }
        
        try {
        
        let evalued = await eval(args.join(" "));     
               
        if (typeof evalued !== "string")
          evalued = require("util").inspect(evalued, { depth: 0 });
                    
        const arr = Discord.Util.splitMessage(evalued, { maxLength: 1950 });
        
        
        
          await message.channel.send("```js\n"+arr[0]+"```");
        
        } catch (err) {
                   
        const arr = Discord.Util.splitMessage(err.toString(), { maxLength: 1950 });
          message.channel.send("```js\n"+arr[0]+"```");
                
         }
    }
}