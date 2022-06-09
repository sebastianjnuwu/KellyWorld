//listing the packages used!
const Discord = require('discord.js')

//command import using with hadler
module.exports = {
    name: 'castigo',
    description: '⛓️ quer silenciar alguém?',
    type: 'CHAT_INPUT',
    options: [{
        name: 'usuario',
        type: 'USER',
        description: 'Mencione um usuário para ser ssilenciado!',
        required: true,
    },
    {
        name: 'tempo',
        description: 'quantidade de tempo em minutos',
        type: 'NUMBER',
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
   
   let t = interaction.options.getNumber('tempo');
   
   let tempo = t * 60;
   
   let motivo = interaction.options.getString("motivo") || `Você não inseriu um motivo.`;
   
   if (!interaction.member.permissions.has("MODERATE_MEMBERS")) return          interaction.reply({ content: "<:K_negado:943604703378415688> | Você não possui permissão para utilizar este comando.", ephemeral: true });
    
   if (!interaction.guild.me.permissions.has("MODERATE_MEMBERS")) return interaction.reply({ content: "<:K_negado:943604703378415688> | eu não tenho a permissão `MODERATE_MEMBERS`, como você me convida para seu servidor e não me dar as permissões nenecessária 7-7", ephemeral: true });
     
   if(user.id === client.user.id) return interaction.reply({ content: "Por que você quer me silenciar?", ephemeral: true });
    
   if(user.id === interaction.user.id) return interaction.reply({ content: "Você não pode se silenciar!", ephemeral: true });
    
   if(user.roles.highest.position > interaction.guild.me.roles.highest.position ) return interaction.reply({ content: "<:K_negado:943604703378415688> | o cargo do usuario é maior que o meu!", ephemeral: true });
   
   if(user.isCommunicationDisabled()) return interaction.reply({ content: "<:K_negado:943604703378415688> | este membro já estar ssilenciado!", ephemeral: true });

 user.timeout(tempo, motivo).catch(() => {});

 interaction.reply({ content: `${user} foi silenciado por ${tempo} minuto(s)!`});

    }
};
