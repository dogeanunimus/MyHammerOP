module.exports = async (client, member) => {
  let canal = client.channels.cache.get('646072711797538818');

	canal.send('Se ha unido al servidor <@'+member+'>');

}