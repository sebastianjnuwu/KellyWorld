//Importing the packages used in this command!
const Discord = require("discord.js");

//Import module accepted by hadler!
module.exports = {   
  name: "ajuda",
  aliases: ['help','ajuda'],
  run: async(client, message) => {

  //We define the message in embed!
  let help = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle('🔍 commandos!')
	     .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
       
       
      message.reply({ embeds: [help] });
  }
  //is this the end of the code? yes it is the end of the code! 
};