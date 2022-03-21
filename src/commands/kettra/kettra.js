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
    .setDescription(`convide seus amigos por este link: https://kettraworld.github.io/discord`)
    .setColor('RANDOM');
    
   message.channel.send({ embeds: [embed] });

    } else if (args[0] == 'site') {
    
        message.reply("ja deu um olhada em nosso site? não!\nLink: https://kettraworld.github.io");
     
    } else if (args[0] == 'voto') {
      
        message.reply("vocé ja deu 1 voto para kettra? clique aqui: https://kettraworld.github.io/votar.html");
         
    } else if (args[0] == 'historia') {
      const content = args.join(" ");
      var canal = message.guild.channels.cache.find(ch => ch.id === "955517600236986389");
      
      const message_msg = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`:smile_cat: Temos uma nova pergunta!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Enviado por ${message.author}\n\n**pergunta:** ${content}\nㅤ`)
    .setTimestamp()    
    .setFooter({ text:`Obrigado ${message.author.tag} por qierwr conhecer mais sobre kettra...`})
    
    message.channel.send(`${message.author} a mensagem foi enviada com sucesso!`).then(k => {
	setTimeout(() => {
                    k.delete()
               
                }, 12000) 
            })
    } 
  }
}
};