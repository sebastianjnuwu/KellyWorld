// importing the packages/libraries used this command!
const Discord = require('discord.js');
const ms = require('ms');

// slash command import module supported by hadler.
module.exports = {
   name: 'punishment',
   description: '⛓️ want to punish someone?',
   type: 'CHAT_INPUT',
  options: [{
   name: 'usuario',
   type: 'USER',
   description: 'Mencione um usuário para ser castigado!',
   required: true,
  },
  {
    name: 'tempo',
    description: 'tempo em minutos para o usuário sair do castigo!',
    type: 'NUMBER',
    required: true,
  },
  {
    name: "motivo",
    type: 'STRING',
    description: "Seleciona o motivo do castigo dedea usuário!.",
    required: false,
  }],
  run: async (client, interaction, options) => {

// we define the user variable that will be punished!
  let user = interaction.options.getMember('usuario');

// we define the time variable!
  let t = interaction.options.getNumber('tempo');
 
 // we define the reason variable.
  let motivo = interaction.options.getString("motivo") || `Não especificado...`;
 
 // we define an if that checks if the bot has the necessary permission to execute the command!
 if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não tenho a permissão de `ADMINISTRADOR`.....", ephemeral: true });
 
 // we define an if that checks if the user has the necessary permission to execute the command!
 if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return          interaction.reply({ content: "<:K_negado:943604703378415688> | Você não possui permissão para utilizar este comando, permissão necessária `MODERATE_MEMBERS`...", ephemeral: true });
 
 // we define an if if the time is 0 or less drill!we define an if if the time is 0 or less drill!
 if(t <= 0) return interaction.reply({ content: `<:K_negado:943604703378415688> | Não existe minutos menores que 0!`, ephemeral: true });

 // converting time from milliseconds to minutes
 let tempo = ms(`${t}m`);
 
 // we set a variable to not punish the bot!
 if(user.id === client.user.id) return interaction.reply({ content: "Por que?", ephemeral: true });
 
 // we define a variable so the author doesn't punish himself.
 if(user.id === interaction.user.id) return interaction.reply({ content: "Você não pode se castigar!", ephemeral: true });
 
 // we define a variable to not punish the server owner.
  if(user.id === interaction.guild.ownerId) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não posso castigar o dono(a) do servidor!", ephemeral: true });
 
 // job verification if the bot's job is lower it will let you know!
 if(user.roles.highest.position > interaction.guild.me.roles.highest.position ) return interaction.reply({ content: "<:K_negado:943604703378415688> | o cargo do usuario é maior que o meu!", ephemeral: true });
 
 // warn that the Member is already grounded.
 if(user.isCommunicationDisabled()) return interaction.reply({ content: "<:K_negado:943604703378415688> | este membro já estar silenciado!", ephemeral: true });

 // leaving the punished member of punishment!
 user.timeout(tempo, motivo).catch(() => {});

// sending the message that the command was i! success.
interaction.reply({ content: `${user} foi silenciado por ${tempo} minuto(s)!`, ephemeral: true });

  }
};