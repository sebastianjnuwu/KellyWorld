import {
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
} from 'discord.js';

async function TicketClose(interaction, client) {
    const channel = await client.db.ticket.findOne({
        channel: interaction.channel.id,
        guild: interaction.guild.id,
    });

    if (!channel) return interaction.deferUpdate();

    await interaction.channel.permissionOverwrites.edit(channel.id, {
        ViewChannel: false,
    });

    const close = new EmbedBuilder()
        .setTitle(`Atendimento`)
        .setDescription(
            `Atendimento foi fechado por ${interaction.user.username}.`,
        );

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Reabrir')
                .setCustomId('ticket-reopen')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🔓'),
        )
        .addComponents(
            new ButtonBuilder()
                .setLabel('Deletar o ticket')
                .setCustomId('ticket-delete')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('❌'),
        );

    await interaction.reply({ embeds: [close], components: [row] });
}

export default TicketClose;
