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
   
    } else if (args[0] == 'ip') {
		message.delete()
  message.author.send(`${message.author}\n\n**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`).catch((e) => {
   message.channel.send(`${message.author}\n\n**Java Edition: \`kettraworld.jogar.io\`\nBedrock: \`190.115.197.81\`\nPorta: \`10001\`**`)
  })
      
    } else if (args[0] == 'bug') {
      message.delete();
const content = args.join(" ");
if (!args[1]) {
  return message.channel.send(`${message.author.username}, escreva o bug após o comando`)
} else if (content.length > 1000) {
  return message.channel.send(`${message.author.username}, forneça um bug de no máximo 1000 caracteres.`);
} else {
  var canal = message.guild.channels.cache.find(ch => ch.id === "937357943790268417");
  
  const message_msg = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`:smile_cat: Temos uma novo bug!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Enviado por ${message.author}\n\n**bug:** ${content}\nㅤ`)
    .setTimestamp()    
    .setFooter({ text:`Obrigado por informar esse bug ${message.author.tag} ...`})

    
    canal.send({ embeds: [message_msg] }).then(msg => {
    let negativo = "❌";
    let atencao = "⚠️";
    let positivo = "✅";
    msg.react(negativo)
    msg.react(atencao) 
    msg.react(positivo) 
    })
  
   message.channel.send(`${message.author} a mensagem foi enviada com sucesso!`).then(m => {
   setTimeout(() => {
                    m.delete()
                }, 12000) 
            })
         }
    }
  }
}
};