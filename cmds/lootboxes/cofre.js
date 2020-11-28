module.exports = {
	config: {
		nombre: "cofre",
		alias: ["co"],
		descripcion: "Para abrir un cofre.",
		categoria: "Lootboxes"
	},

	run: async (client, message, args) => {

			message.channel.send(message.author.displayAvatarURL({size: 1024}));

		}
	}
		
		