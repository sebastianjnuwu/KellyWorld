const Discord = require("discord.js");

module.exports = {
    name: "kettra",
    aliases: ["kettra"],

run: async(client, message, args) => {
 
 if( message.guild.id !== "893997835412971570") {
	       return;
		
                  	} else {

	if (args[0] == 'convite') {
     
    let embed = new Discord.MessageEmbed()
     .setTitle(`🌟 convide amigos para se juntar!`)
     .setDescription(`convide seus amigos por este link: https://discord.gg/NDzFeDp8YE`)
     .setColor('RANDOM');
    message.channel.send({ embeds: [embed] });

    } else if (args[0] == 'site') {
    
   message.reply("ja deu um olhada em nosso site? não!\nLink: https://kettraworld.github.io");
     
  } else if (args[0] == 'voto') {
      
   message.reply("vocé ja deu 1 voto para kettra? clique aqui: https://kettraworld.github.io/votar.html");
   
    } else if (args[0] == 'ip') {
      
		message.delete()
		
    message.author.send(`${message.author}\n\n**Java Edition: \`br-arm-7.enxadahost.com\`\nBedrock: \`br-arm-7.enxadahost.com\`\nPorta: \`10001\`**`).catch((e) => {
   message.channel.send(`${message.author}\n\n**Java Edition: \`br-arm-7.enxadahost.com:10972\`\nBedrock: \`br-arm-7.enxadahost.com\`\nPorta: \`10001\`**`)
  })
      
    }
}
}
}