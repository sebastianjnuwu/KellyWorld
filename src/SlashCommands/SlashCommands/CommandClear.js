// importing the packages/libraries used this command!
const Discord = require('discord.js')

// slash command import module supported by hadler.
module.exports = {
    name: 'Clear',
    description: '🗑️ clear channel messages?',
    type: 'CHAT_INPUT',
  options: [{
    name: 'NUMBER',
    description: 'Number of messages to be deleted.',
    type: 'NUMBER',
    required: true,
  }],
  run: async (client, interaction, options) => {
  
  //we set the variable of how many messages to delete!
  let delamount = interaction.options.getNumber('NUMBER');

  // we define an if that checks if the bot has the necessary permission to execute the command!
  if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não tenho a permissão de `ADMINISTRADOR`.....", ephemeral: true });
  
  // we define an if that checks if the user has the necessary permission to execute the command!
  if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "<:K_negado:943604703378415688> | Você não possui permissão para utilizar este comando.", ephemeral: true });
  
  // we define an if to slash the number 0 or less! 
  if(delamount <= 0) return interaction.reply({ content: "<:K_negado:943604703378415688> | Voce pode apagar apenas de 1 a 99 mensagens", ephemeral: true });

 // we define an if if the messages to be deleted exceed 99.
  if(parseInt(delamount) > 99) return interaction.reply({ content: "<:K_negado:943604703378415688> | Voce pode apagar apenas de 1 a 99 mensagens", ephemeral: true });
  if(parseInt(delamount) > 99) return interaction.reply({ content: "<:K_negado:943604703378415688> | Voce pode apagar apenas de 1 a 99 mensagens", ephemeral: true });
 
 // finally delete the channel messages according to the amount
  await interaction.channel.bulkDelete(parseInt(delamount), true);
  
  // sends a message that only the user who executed the command can see!
  interaction.reply({ content: `o chat teve ${delamount} mensagens apagadas!`, ephemeral: true });

  }
};