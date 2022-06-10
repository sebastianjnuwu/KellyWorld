// importing the packages/libraries used this command!
const Discord = require("discord.js");

// slash command import module supported by hadler.
module.exports =  {
    name: "icon", 
    description: "🖼️ Quer ver o icone deste servidor?", 
    type: "CHAT_INPUT",
  run: async (client, interaction) => {
  
  //Server icon variables that will be used!
  const sicon = interaction.guild.iconURL({ dynamic : true, format: "png", size: 1024});
  
  //We define the embed message
  const embed = new Discord.MessageEmbed()
       .setTitle(`🖼️ icone do servidor:`)
       .setDescription(`[Link da imagem aqui](${sicon})`)
       .setImage(sicon)
       .setColor('#ef00ff')
       
  // sending the embed message.
  await interaction.reply({ embeds: [embed] });
    
  }
};