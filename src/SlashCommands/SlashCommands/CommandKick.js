// importing the packages/libraries used this command!
const Discord = require('discord.js')

// slash command import module supported by hadler.
module.exports = {
    name: 'kick',
    description: '🦶 kick someone off the server.',
    type: 'CHAT_INPUT',
    options: [{
        name: 'usuario',
        type: 'USER',
        description: 'Mention a user.',
        required: true,
    },
    {
        name: "motivo",
        type: 'STRING',
        description: "what is the reason for the expulsion?.",
        required: false,
        }],
  run: async (client, interaction, options) => {

  // we define the member variable.
  let user = interaction.options.getMember('usuario');
   
  // we define the reason variable.
  let motivo = interaction.options.getString("motivo") || `Não especificado...`;

 // we define an if that checks if the bot has the necessary permission to execute the command!
  if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não tenho a permissão de `ADMINISTRADOR`.....", ephemeral: true });

// we define an if that checks if the user has the necessary permission to execute the command!
  if(!interaction.member.permissions.has("KICK_MEMBERS")) return          interaction.reply({ content: "<:K_negado:943604703378415688> | Você não possui permissão para utilizar este comando.", ephemeral: true });
  
  // we set a variable to not kick the server owner.
  if(user.id === interaction.guild.ownerId) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não posso expulsar o dono(a) do servidor!", ephemeral: true });

 // we set a variable to not kick the bot.
  if(user.id === client.user.id) return interaction.reply({ content: "Por que você quer me expulsar.....", ephemeral: true });
  
  // we set a variable to not kick the author.
  if(user.id === interaction.user.id) return interaction.reply({ content: "Você não pode ser expulsar, tá doido?", ephemeral: true });
  
  // job check if the job title is less will warn that it cannot execute the command.
  if(user.roles.highest.position > interaction.guild.me.roles.highest.position ) return interaction.reply({ content: "<:K_negado:943604703378415688> | o cargo do usuario é maior que o meu!", ephemeral: true });
 
 // banning the user....
 interaction.guild.members.kick(user, motivo);

 // successful the command send this message.
 interaction.reply({ content: `${user} foi expulso com sucesso!`});

  }
};