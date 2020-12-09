const { readdirSync } = require("fs")
const ascii = require("ascii-table");
let table = new ascii("Tabla de inicio");
table.setHeading("Comandos", "Estado de carga");

module.exports = (client) => {
    const load = dirs => {

        const commands = readdirSync(`./cmds/${dirs}/`).filter(d => d.endsWith('.js'));
           
        for (let file of commands) {
          
            let carpeta = require(`../cmds/${dirs}/${file}`); 
            client.commands.set(carpeta.config.nombre, carpeta); 
            if (carpeta.config.nombre) {
                table.addRow(file, 'Correcta');
            
            } else {
            
                table.addRow(file, `❌  -> falta un help.name, o help.name no es un string.`);
                continue;
            }
            
            if (carpeta.config.alias) carpeta.config.alias.forEach(a => client.alias.set(a, carpeta.config.nombre)); 
          
          }; 
        };
        
        ["moderacion",
         "informacion", 
         "lootboxes",
         "verificacion",
         "testscommands",
         "configuracion",
         "desarrollo",
         "imagenes",
         "interaccion",
         "roblox",
        ].forEach(x => load(x));
  
      console.log(table.toString());
};