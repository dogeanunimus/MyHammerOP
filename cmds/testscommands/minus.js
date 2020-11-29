module.exports = {
    config: {
        nombre: "minus",
        alias: ["m"],
        categoria: "testcommands",
        descripcion: "ToLowerCase",
    },

    run : async (client, message, args) => {
        let codigo = "Prueba";

        if (args.join() == codigo.toLowerCase() || codigo.toUpperCase()) {
            console.log("Es igual.");
        } else {
            console.log("No es igual.")
        }
    }

} 