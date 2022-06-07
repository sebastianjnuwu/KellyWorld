//listing the packages used!
const Discord = require('discord.js')

//command import using with hadler
module.exports = {
    name: 'ban',
    description: '🔨 ban some user from the server!',
    type: 'CHAT_INPUT',
    options: [{
        name: 'usuario',
        type: 'USER',
        description: 'Mencione um usuário.',
        required: true,
    },
    {
        name: "motivo",
        type: 'STRING',
        description: "Seleciona o motivodo banimento desse usuario.",
        required: false,
        }],
    run: async (client, interaction, options) => {

   let user = interaction.options.getMember('usuario');
   
   let motivo = interaction.options.getString("motivo") || `Você não inseriu um motivo.`;

   if (!interaction.member.permissions.has("BAN_MEMBERS")) return          interaction.reply({ content: `:K_negado: | Você não possui permissão para utilizar este comando.`, ephemeral: true });
    
   if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: ":K_negado: | eu não tenho a permissão `BAN_MEMBERS`, como você me convida para seu servidor e não me dar as permissões nenecessária 7-7", ephemeral: true });
     
   if(user.id === client.user.id) return interaction.reply({ content: "Por que você quer me banir do servidor? 7-7", ephemeral: true });
    
   if(user.id === interaction.user.id) return interaction.reply({ content: "Você não pode ser banir! tá doido?", ephemeral: true });
    
   if( user.id.member.roles.highest.postion > interaction.guild.me.roles.highest.position ) return interaction.reply({ content: "o cargo do usuario é maior que o meu!", ephemeral: true }); 
    
interaction.guild.members.ban(user, { reason: motivo });

interaction.reply({ content: `${user} foi banido com sucesso!`});

    }
};

