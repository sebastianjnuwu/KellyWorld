//importing used packages
const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const Discord = require("discord.js")

//import module supported by hadler
module.exports = {
    name: 'say',
    description:  '🗣️ message using Kelly in a channel',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'canal',
            description: 'o canal a ser enviada!',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'] ,
            required: true,
        },
        {
            name: 'mensagem',
            description: 'coloque a mensagem a ser enviada!',
            type: 'STRING',
            required: true,
       }],
    run: async (client, interaction, args) => {
   
  //we set the message and channel variable
  let canal = interaction.options.getChannel('canal') || interaction.channel;
  let mensagem  = interaction.options.getString("mensagem");
  
  try {

//first If saying that the user does not have permission
if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "<:K_negado:943604703378415688> | Você não tem permissão para usar este comando!", ephemeral: true});

 //saying it sent the message to x channel 
  interaction.reply({ content: `${interaction.user} Anúncio enviado com sucesso no canal: <#${canal.id}>`, ephemeral: true })
    
    //sending the message to the requested channel!
    canal.send({content: `${mensagem}`})

  //if there is any mistake
  } catch (err) {

   let Erro = new Discord.MessageEmbed()
     .setDescription(`<:K_negado:943604703378415688> | ${interaction.user} Opss... algo de errado não está certo.`)
        .setColor("#36393e")
        interaction.reply({embeds: [Erro]});
        
    }
 } //finally finished the code lol it took a little work
} 
