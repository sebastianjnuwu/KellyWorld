import { SlashCommandBuilder } from 'discord.js';

const create = () => {
    let command = new SlashCommandBuilder()
        .setName('cleardm')
        .setDMPermission(false)
        .setDescription('Can I delete my messages in your dm?')
        .setDescriptionLocalizations({
            'en-US': 'Can I delete my messages in your dm?',
            'pt-BR': 'Posso apagar minhas mensagens em sua dm?',
        });
    return command.toJSON();
};

const KellyWorld = async (client, interaction, lang) => {
    const dm = await interaction.member.createDM();

    await interaction.reply({
        content: `${lang('language:cleardm.msg')}`,
        ephemeral: true,
    });

    const Delete = await client.channels.cache.get(dm.id).messages.fetch({
        limit: 99,
    });

    await Delete.map(msg => {
        if (msg.author.bot) {
            msg.delete();
        }
    });
};

export { create, KellyWorld };
