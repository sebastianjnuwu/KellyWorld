//importing the packages that will be use
const { MessageAttachment } = require("discord.js");
const { profileImage } = require("discord-arts");

//importação aceitar pela hadler
module.exports = {
    name: "perfil",
    description: "📷 mostrar o seu perfil!",
    type: 'CHAT_INPUT',
  options: [
    {
        name: "user",
        type: "USER",
        description: "Selecione um usuário",
        required: false
    }

],

  run: async(client, interaction, args) => { 

        const discordUser = interaction.options.getUser("user") || interaction.user;
        await interaction.deferReply();
        const bufferImg = await profileImage(discordUser);
        const imgAttachment = new MessageAttachment(bufferImg, "profile.png");

        interaction.followUp({ files: [imgAttachment] });
    }
};