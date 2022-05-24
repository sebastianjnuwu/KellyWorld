//Importing the packages used in this command!
const Discord = require("discord.js");

//Import module accepted by hadler!
module.exports = {
   name: "icon",
    aliases: ["icon"],
  run: async ( message, args) => {
  
  //we set the server icon
  const sicon = message.guild.iconURL({ dynamic : true, format: "png", size: 1024});
  
  //we set the server icon
  const svicon = message.guild.iconURL();
  
  // we define the embed message!
  const embed = new Discord.MessageEmbed()
       .setTitle(`Ícone do servidor:`)
       .setDescription(`[Link da imagem aqui](${sicon})`)
       .setImage(sicon)
       .setColor('#ef00ff')
    await message.channel.send({ embeds: [embed] });
    
    }
    //End of code? yes end of code
};