//importing the packages that will be used!
const Discord = require("discord.js");

//Slash Commands export module
module.exports =  {
    name: "icon", 
    description: "🖼️ Want to see the server icon?", 
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
  
  //Server icon variables that will be used!
  const sicon = interaction.guild.iconURL({ dynamic : true, format: "png", size: 1024});
  const svicon = interaction.guild.iconURL()
  
  //We define the embed message
  const embed = new Discord.MessageEmbed()
       .setTitle(`Ícone do servidor:`)
       .setDescription(`[Link da imagem aqui](${sicon})`)
       .setImage(sicon)
       .setColor('#ef00ff')
    await interaction.reply({ embeds: [embed] });
    
    }
};