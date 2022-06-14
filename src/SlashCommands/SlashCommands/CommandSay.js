// importing the packages/libraries used this command!
const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const Discord = require("discord.js")

// slash command import module supported by hadler.
module.exports = {
    name: 'Say',
    description:  '🗣️ talk as if it were me on a certain channel!',
    type: 'CHAT_INPUT',
  options: [{
    name: 'CHANNEL',
    description: 'the channel to be sent!',
    type: 'CHANNEL',
    channelTypes: ['GUILD_TEXT'] ,
    required: true,
  },
  {
    name: 'MESSAGE',
    description: 'enter the message to be sent!',
    type: 'STRING',
    required: true,
  }],
  run: async (client, interaction, args) => {
   
  // we define the channel variable.
  let canal = interaction.options.getChannel('CHANNEL');
  
  // we define the channel variable.
  let mensagem  = interaction.options.getString("MESSAGE");
  
  try {

 // we define an if that checks if the bot has the necessary permission to execute the command!
 if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não tenho a permissão de `ADMINISTRADOR`.....", ephemeral: true });
 
// we define an if that checks if the user has the necessary permission to execute the command!
if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "<:K_negado:943604703378415688> | Você não tem permissão para usar este comando!", ephemeral: true});

 //saying it sent the message to x channel 
  interaction.reply({ content: `${interaction.user} Anúncio enviado com sucesso no canal: <#${canal.id}>`, ephemeral: true })
    
    //sending the message to the requested channel!
    canal.send({content: `${mensagem}`})

  //if there is any mistake
  } catch (err) {
  
  // if there is an error....
  interaction.reply({ content: "<:K_negado:943604703378415688> | algo de errado nao estar certo!", ephemeral: true });
  
  }
 } 
};
