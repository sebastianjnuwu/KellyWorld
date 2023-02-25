async function TicketDelete(interaction, client) {
    await client.db.ticket.deleteOne({
        channel: interaction.channel.id,
        guild: interaction.guild.id,
    });

    await interaction.deferUpdate().catch(() => {
        return null;
    });

    await interaction.message.delete();

    interaction.channel.send(
        '<:K_atencao:943658966473392128> **Ticket será fechado em 5 segundos!**',
    );

    setTimeout(() => {
        interaction.channel.delete();
    }, 5e3);
}

export default TicketDelete;
