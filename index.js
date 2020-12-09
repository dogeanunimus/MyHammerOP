const { Client, Collection } = require("discord.js"); 
const client = new Client();
const env = require("dotenv").config() 
const fs = require('fs')

const mongoDB = require('./databases/connection.js');

["alias", "commands"].forEach(x => client[x] = new Collection());
["comandos", "eventos"].forEach(x => require(`./handler/${x}`)(client)); 


client.login(process.env.token);