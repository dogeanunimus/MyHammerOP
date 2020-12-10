const { MessageAttachment, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Duration = require("humanize-duration"); 
const used = new Map();

module.exports = {
    config: {
        nombre: "ravatar",
        alias: ["ra", "rv", "robloxavatar"],
        categoria: "ROBLOX",
        descripcion: "Muestra el avatar de un jugador de ROBLOX",
    },

    run: async (client, message, args) => {
        try {
        let RobloxUser = args.join(" ");
        if (!RobloxUser) {
            const embed = new MessageEmbed()
            .setDescription("<:error:755652678285131848> Agrega el nombre de un jugador de ROBLOX")
            .setColor("BLUE")
            return message.channel.send(embed).then(m => {
                m.delete({timeout: 7000})
            })
        }

const cooldown = used.get(message.author.id);
if (cooldown) {           
   const remaining = Duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true});
   const embed = new MessageEmbed() 
  .setDescription(`<:uptime:775193433492684850> Ya usaste este comando. Espera **${remaining} ** para volver a usarlo.`)
  .setColor("RED")
  return message.channel.send({embed}).then(async (message) => {
  setTimeout(() => {
    message.delete();
    }, 7000)
    });  
}

  else {     
                                 
    used.set(message.author.id, Date.now() +   20000);
    setTimeout(()=> used.delete(message.author.id),  20000);
  
  } 
 


    const UserData = await fetch(`https://api.roblox.com/users/get-by-username?username=${RobloxUser.replace("#", "")}`,  {
       
    method: 'GET',
    
        'Accept': 'application/json'
});

let userID = await UserData.json();

const userDisplayName = await fetch(`https://users.roblox.com/v1/users/${userID.Id}`,  {
  
    method: 'GET',
          
        'Accept': 'application/json'

});

const userDataName = await userDisplayName.json();

let avatar = `http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${userDataName.displayName}` 
let CargarAvatar = new MessageAttachment(avatar, `${userDataName.displayName}.png`);

message.channel.send('<:correcto:755576359329464350> **Avatar del usuario:** `'+userDataName.displayName+'` en `'+client.ws.ping+' ms`', { files: [CargarAvatar] });



} catch (error) {
    message.channel.send("Ese usuario no existe.")
}
    }
}