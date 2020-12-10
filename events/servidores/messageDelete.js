const snipeDB = require('../../databases/models/snipemessages.js');
module.exports = async (client, message) => {

  let mensaje = await snipeDB.findOne({canal: message.channel.id}).exec();
  
  if (mensaje) {
      await snipeDB.updateOne({ 
        canal: message.channel.id, 
        mensaje: message.content,
        autorEliminado: message.author.tag,
      });

  } else {
  
    let nuevo = new snipeDB({canal: message.channel.id, mensaje: message.content, autorEliminado: message.author.tag})

      await nuevo.save()
  
    }
  }