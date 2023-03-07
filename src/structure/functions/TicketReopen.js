async function TicketReopen(interaction, client) {
	const channel = await client.db.ticket.findOne({
		channel: interaction.channel.id,
		guild: interaction.guild.id,
	});

	if (!channel) return interaction.deferUpdate();

	await interaction.channel.permissionOverwrites.edit(channel.id, {
		ViewChannel: true,
	});

	await interaction.message.delete();
}

export default TicketReopen;
