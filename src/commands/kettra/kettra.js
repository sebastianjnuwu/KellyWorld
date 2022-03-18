const Discord = require("discord.js");

module.exports = {
    name: "kettra",
    aliases: ["kettra"],

run: async(client, message, args) => {
 
<<<<<<< HEAD
 if(guild= "893997835412971570") {
	 return;
  if(args[0] == 'convite') {
=======
	if( message.guild.id !== "893997835412971570") {
	  return;
	} else {
	  
	if (args[0] == 'convite') {
>>>>>>> origin/main
     
 let embed = new Discord.MessageEmbed()
    .setTitle(`🌟 convide amigos para se juntar!`)
    .setDescription(`convide seus amigos por este link: https://kettraworld.github.io/discord`)
    .setColor('RANDOM')
    
   message.channel.send({ embeds: [embed] })

    } else if (args[0] == 'site') {
    
        message.reply("ja deu um olhada em nosso site? não!\nLink: https://kettraworld.github.io");
     
    } else if (args[0] == 'voto') {
      
        message.reply("vocé ja deu 1 voto para kettra? clique aqui: https://kettraworld.github.io/votar.html")

    } 
  }
}
}
					  