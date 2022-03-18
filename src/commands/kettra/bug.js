const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "bug",
    aliases: ["bug"],
run: async (client, message, args) => {
message.delete();
	if( message.guild.id !== "893997835412971570") {
	  return
	} else {
const content = args.join(" ");

if (!args[0]) {
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