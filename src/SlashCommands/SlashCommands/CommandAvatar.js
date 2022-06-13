// importing the packages/libraries used this command!
const { MessageEmbed } = require('discord.js');
const { MessageAttachment } = require("discord.js");
const { profileImage } = require("discord-arts");

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
  const discordUser = interaction.options.getUser("user") || interaction.user;
   

     await interaction.deferReply();
     const bufferImg = await profileImage(discordUser);
     const imgAttachment = new MessageAttachment(bufferImg, "profile.png");

     interaction.followUp({ files: [imgAttachment] });

  
  }
};
