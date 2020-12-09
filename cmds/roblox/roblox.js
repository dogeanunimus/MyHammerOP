const used = new Map();
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Duration = require("humanize-duration"); 
const moment = require("moment");
const momentDurationFormatSetup = require('moment-duration-format');
require("moment-duration-format");
moment.locale("es")

module.exports = {
    config: {
        nombre: "roblox",
        alias: ["ro", "robloxuser", "rb"],
        categoria: "ROBLOX",
        descripcion: "Muestra información de un jugador de ROBLOX",
    },

    run: async (client, message, args) => {
        try {

            message.channel.startTyping(5000)
            message.channel.stopTyping(5000)

            let RobloxUser = args.join(" ");
        if (!RobloxUser) return message.channel.send("<:esperando:755652706873507860> | Te falta agregar el usuario de un jugador de roblox.");


        const cooldown = used.get(message.author.id);
        if(cooldown) {           
          const remaining = Duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true});
          
          const embed = new MessageEmbed() 
         .setDescription(`¡Alto! Descansa un poco la mano. Espera ${remaining} para volver a usarlo.`)
         .setColor("RED")
           
            return message.channel.send({embed}).then( async (message) => {
                 setTimeout(() => {
                 message.delete();
               }, 7000)
               });     
            }
        
           else {     
                                          
             used.set(message.author.id, Date.now() +   10000);
             setTimeout(()=> used.delete(message.author.id),  10000);
        
           } 
           
           let extraerID = await fetch(`https://api.roblox.com/users/get-by-username?username=${RobloxUser.replace("#", "")}`,  {
       
            method: 'GET',
            
                'Accept': 'application/json'
        });

            const RobloxUserID = await extraerID.json();

            let descripcion = await fetch(`https://users.roblox.com/v1/users/${RobloxUserID.Id}`,  {
            method: 'GET',
                'Accept': 'application/json'
        });
            let status = await fetch(`https://users.roblox.com/v1/users/${RobloxUserID.Id}/status`,  {
             method: 'GET',
                'Accept': 'application/json'
        });

            let amigos = await fetch(`https://friends.roblox.com/v1/users/${RobloxUserID.Id}/friends/count`,  {
            method: 'GET',
                'Accept': 'application/json'
        });

            let seguidores = await fetch(`https://friends.roblox.com/v1/users/${RobloxUserID.Id}/followers/count`,  {
            method: 'GET',  
            'Accept': 'application/json'
        });

        let inventario = await fetch(`https://inventory.roblox.com/v1/users/${RobloxUserID.Id}/can-view-inventory`,  {
        method: 'GET', 
        'Accept': 'application/json'

        });


    let description = await descripcion.json();
    let estado = await status.json();
    let friends = await amigos.json();
    let followers = await seguidores.json();
    let inventory = await inventario.json();

        const fecha = moment(description.created).format('MMMM Do YYYY, h:mm:ss a'); 
        const años = moment(description.created, "YYYYMMDD").fromNow();
        const AvatarUrl = `http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${description.displayName}`
        const avatar = `https://www.roblox.com/headshot-thumbnail/image?userId=${RobloxUserID.Id}&width=420&height=420&format=png`
        const perfilUrl = `https://www.roblox.com/users/${RobloxUserID.Id}/profile`

        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(avatar)
        .setDescription(`<:correcto:755576359329464350> **Información del jugador ${description.displayName}**`)
        .addField(`>>> <:onlains:772942790187024434> • Estado:`, estado.status !== "" ? estado.status : "`Sin estado`")
        .addField(`>>> <:rich:772945192356413440> • Descripción:`, description.description !== "" ? description.description : "`Sin descripción`")
        .setColor("BLUE")
        .addField("`🌐` ❯❯ Información General ➜", `>>> <:pinned:772947382430072863> • ID:〘 **${RobloxUserID.Id} ** 〙\n<:members:784968076188975145> • Amigos:〘 **${friends.count}** 〙\n<:seguidores:784968217067388979> • Seguidores:〘 **${followers.count}** 〙\n<:chest:784965126704463923> • Inventario:〘 **${inventory.canView ? '**Visible para todos**' : ' No es visible '}** 〙`)
        .addField("`📆` ❯❯ Creación de la cuenta ➜", `>>> ${fecha} (${años})`)
        .addField("`📲` ❯❯ Enlaces:", `>>> **〘 [Perfil ${description.displayName}](${perfilUrl})** • **[Avatar](${AvatarUrl})** 〙`)
        
        message.channel.send(embed);

        } catch (error) {
            const embed = new MessageEmbed()
            .setDescription("<:esperando:755652706873507860> ¡Oops! No existe ese jugador.")
            .setColor("RED")
            message.channel.send(embed).then(m => {
                m.delete({timeout: 10000})
            })
        }    
    }
}