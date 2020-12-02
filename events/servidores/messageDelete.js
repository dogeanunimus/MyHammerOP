const snipe = require('../../cmds/moderacion/snipe.js');
const snipeDB = require('../../databases/models/snipemessages.js');
module.exports = async (client, message) => {

  let mensaje = await snipeDB.findOne({canal: message.channel.id}, {mensaje: message.content}, {autor: message.author.username})
  
  if (mensaje) {

    await snipeDB.updateOne({canal: message.channel.id}, {mensaje: message.content}, {autor: message.author.username})

  } else {
  
    let nuevo = new snipeDB({canal: message.channel.id, mensaje: message.content, autor: message.author.username})

      await nuevo.save()
  
    }
  }