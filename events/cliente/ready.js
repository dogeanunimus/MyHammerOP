module.exports = async client => {

console.log(`¡Todos los comandos fueron cargados correctamente, MyHammerOP se ha iniciado correctamente`);

    client.user.setPresence({
        status: "online",
        activity: {
            name: `test`,
            type: "WATCHING"
        }
    });
}

