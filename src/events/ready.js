const Discord = require("discord.js");
const client = require("./../../index.js");
const { colors } = require("kettraworld.db");

//Useful information
client.once("ready", () => {
 console.log(colors.cyan("[Info]")+` ${client.user.tag} foi iniciada em ${client.guilds.cache.size} sevidores!`);
 console.log(colors.cyan("[Info]")+` tendo acesso a ${client.channels.cache.size} canais!`);
 console.log(colors.cyan("[Info]")+` contendo ${client.users.cache.size} usuarios!`);
});