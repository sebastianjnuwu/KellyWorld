import {
	ChannelType,
	PermissionFlagsBits,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from 'discord.js';

async function TicketOpen(interaction, client) {
	const search = await client.db.ticket.findOne({
		id: interaction.user.id,
		guild: interaction.guild.id,
	});

	await interaction.message.edit({
		components: interaction.message.components,
	});

	if (search)
		return interaction.reply({
			content: 'Você já possui um ticket aberto!',
			ephemeral: true,
		});

	const channel = await interaction.guild.channels.create({
		name: `${interaction.values[0].split('-')[0]}-${interaction.user.username}`,
		type: ChannelType.GuildText,
		parent: '1001201083974168606',
		permissionOverwrites: [
			{
				id: interaction.user.id,
				allow: [
					PermissionFlagsBits.ViewChannel,
					PermissionFlagsBits.SendMessages,
					PermissionFlagsBits.ReadMessageHistory,
				],
			},
			{
				id: '975527943319199744',
				allow: [
					PermissionFlagsBits.ViewChannel,
					PermissionFlagsBits.SendMessages,
					PermissionFlagsBits.ReadMessageHistory,
				],
			},
			{
				id: interaction.guild.id,
				deny: [
					PermissionFlagsBits.ViewChannel,
					PermissionFlagsBits.SendMessages,
					PermissionFlagsBits.ReadMessageHistory,
				],
			},
		],
	});

	await interaction.reply({
		content: 'Seu ticket foi aberto com sucesso! <#' + channel.id + '>',
		ephemeral: true,
	});

	const suport = new EmbedBuilder()
		.setTitle('📫 Suporte!')
		.setColor('#71368A')
		.setThumbnail(interaction.guild.iconURL({ format: 'png', size: 1024 }))
		.setDescription(
			'Você receberá suporte em breve, enquanto isso descreva em detalhes o problema que você está enfrentando.',
		);

	const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder().setLabel('Fechar').setStyle(ButtonStyle.Danger).setEmoji('⚠️').setCustomId('ticket-close'),
	);

	await client.db.ticket.create({
		id: interaction.user.id,
		channel: channel.id,
		guild: interaction.guild.id,
	});

	channel.send({
		content: `${interaction.user}`,
		embeds: [suport],
		components: [row],
	});
}

export default TicketOpen;
