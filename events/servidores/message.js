module.exports = async (client, message) => {
  try {

  const PrefixDB = require('../../databases/models/prefixes.js');

  let res = await PrefixDB.findOne({guild: message.guild.id}).exec() 
  let prefix = res ? res.prefix : ".";

    if(message.author.bot || message.channel.type === "dm") return; 
    
    let args = message.content.slice(prefix.length).trim().split(/ +/g); 
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;

    let commandfile = client.commands.get(cmd) || client.commands.get(client.alias.get(cmd))
    if(!commandfile) return message.channel.send("No existe ese comando.")
    if(commandfile) commandfile.run(client, message, args) 

  } catch (error) {
   return;    
  }

}