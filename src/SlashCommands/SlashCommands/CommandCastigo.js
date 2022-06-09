//listing the packages used!
const Discord = require('discord.js');
const ms = require('ms');

//command import using with hadler
module.exports = {
  name: 'castigo',
  description: '⛓️ quer castigar alguém?',
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
 
 //
  let motivo = interaction.options.getString("motivo") || `Você não inseriu um motivo.`;
 
 if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não tenho a permissão de `ADMINISTRADOR`.....", ephemeral: true });
 
 if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return          interaction.reply({ content: "<:K_negado:943604703378415688> | Você não possui permissão para utilizar este comando, permissão necessária `MODERATE_MEMBERS`...", ephemeral: true });
 
 if(t <= 0) return interaction.reply({ content: `<:K_negado:943604703378415688> | Não existe minutos menores que 0!`, ephemeral: true });

 let tempo = ms(`${t}m`);
   
 if(user.id === client.user.id) return interaction.reply({ content: "Por que?", ephemeral: true });
    
 if(user.id === interaction.user.id) return interaction.reply({ content: "Você não pode se castigar!", ephemeral: true });
 
  if(user.id === interaction.guild.ownerId) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não posso castigar o dono(a) do servidor!", ephemeral: true });
    
 if(user.roles.highest.position > interaction.guild.me.roles.highest.position ) return interaction.reply({ content: "<:K_negado:943604703378415688> | o cargo do usuario é maior que o meu!", ephemeral: true });
   
   if(user.isCommunicationDisabled()) return interaction.reply({ content: "<:K_negado:943604703378415688> | este membro já estar silenciado!", ephemeral: true });

 user.timeout(tempo, motivo).catch(() => {});

interaction.reply({ content: `${user} foi silenciado por ${tempo} minuto(s)!`, ephemeral: true });
    }
};