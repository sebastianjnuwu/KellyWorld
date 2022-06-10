// importing the packages/libraries used this command!
const {  MessageEmbed } = require('discord.js')

// slash command import module supported by hadler.
module.exports = {
    name: 'avatar',
    description: "📷 ja viu seu avatar? ou de algum membro do servidor?",
    type: "CHAT_INPUT",
  options: [{
    name: 'membro',
    type: 'USER',
    description: 'Seleciona o usuário',
    required: false,
  }],
  run: async (client, interaction, options) => {

  // we define the member variable that will show the avatar.
  const user = interaction.options.getUser('membro') || interaction.member.user
   
   // we define the message in embed.
  const embed = new MessageEmbed()
         .setTitle(`📸 Avatar de ${user.username}`)
         .setColor('BLUE')
         .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
         .setDescription(`Faça o download clicando [aqui.](${user.avatarURL({ format: 'png' })})`)
  
  // and finally we send the message in embed.  
  await interaction.reply({ embeds: [embed] });
  
  }
};