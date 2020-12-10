const dsnipeDB = require('../../databases/models/editsnipe.js');

module.exports = async (client, oldMessage, newMessage) => {
    let mensaje = await dsnipeDB.findOne({direccion: newMessage.channel.id}).exec()
    if (mensaje) {
        await dsnipeDB.updateOne({
            direccion : newMessage.channel.id,
            usuarioAutor : newMessage.author.username,
            antes : oldMessage.content,
            despues : newMessage.content,
        });
    } else {
        let nuevo = new dsnipeDB({direccion: newMessage.channel.id, usuarioAutor: newMessage.author.username, antes: oldMessage.content, despues: newMessage.content})

        await nuevo.save()
    }
}