const Discord = require("discord.js");
const { JsonDatabase } = require('kettraworld.db');
const db = new JsonDatabase({
  DatabaseJson:"./src/database/database.json"
});

module.exports = {
    name: "ajuda!",
    aliases: ["help","ajuda","ayudar"],

  run: async(client, message, args) => {

 let language = db.get(`language_${message.guild.id}`);
 
 if( language == null ) { 
     db.set(`language_${messag.guild.id}`, "pt");
}

 if (language === "pt") {
   if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
       return message.reply("<:K_zan:924366252024164363> eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ")
 };
      let help = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle('🔍 commandos!')
 };