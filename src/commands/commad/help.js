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
	  .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription('"Esta menina tem dois lados um é o sol o outro é a lua. Com o sol ela expressa felicidade e alegria. Com a lua ele expressa seu medo e tristeza."\n\n• 📸  `K.avatar` - Mostre seu avatar e também com id ou menção!\n\n• 🖼️  `icon` - Mostre o ícone do servidor!\n\n• 🏓  `K.ping` - Mostrar ping KellyWorld!\n\n• 🌎  `K.setlanguage` - para alterar o idioma do servidor!')
      message.reply({ embeds: [help] })
 };
	  
  }
}